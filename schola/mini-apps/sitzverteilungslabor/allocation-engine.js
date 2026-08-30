(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.SeatAllocation = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const METHODS = {
    "sainte-lague": { name: "Sainte-Laguë/Schepers", kind: "Divisorverfahren" },
    dhondt: { name: "D’Hondt", kind: "Höchstzahlverfahren" },
    hare: { name: "Hare/Niemeyer", kind: "Quotenverfahren" },
  };

  const EPSILON = 1e-12;
  const compareNumber = (a, b) => Math.abs(a - b) <= EPSILON * Math.max(1, Math.abs(a), Math.abs(b));
  const safeNumber = value => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;

  function normalizeParties(parties) {
    return parties.map((party, index) => ({
      id: String(party.id || `party-${index + 1}`),
      name: String(party.name || `Partei ${index + 1}`),
      votes: safeNumber(party.votes),
      order: index,
    }));
  }

  function prepare(parties, threshold) {
    const normalized = normalizeParties(parties);
    const totalVotes = normalized.reduce((sum, party) => sum + party.votes, 0);
    const limit = Math.min(100, Math.max(0, safeNumber(threshold)));
    const enriched = normalized.map(party => ({
      ...party,
      voteShare: totalVotes ? party.votes / totalVotes * 100 : 0,
    })).map(party => ({ ...party, eligible: party.voteShare + EPSILON >= limit && party.votes > 0 }));
    return { parties: enriched, eligible: enriched.filter(party => party.eligible), totalVotes, threshold: limit };
  }

  function priorityCompare(a, b) {
    if (!compareNumber(a.quotient, b.quotient)) return b.quotient - a.quotient;
    if (a.party.votes !== b.party.votes) return b.party.votes - a.party.votes;
    return a.party.id.localeCompare(b.party.id, "de");
  }

  function highestAverages(eligible, seats, divisorForSeat) {
    const awarded = new Map(eligible.map(party => [party.id, 0]));
    const steps = [];
    for (let round = 0; round < seats; round += 1) {
      const candidates = eligible.map(party => {
        const currentSeats = awarded.get(party.id);
        return { party, quotient: party.votes / divisorForSeat(currentSeats), currentSeats };
      }).sort(priorityCompare);
      const winner = candidates[0];
      const tied = candidates.filter(candidate => compareNumber(candidate.quotient, winner.quotient)).map(candidate => candidate.party.id);
      awarded.set(winner.party.id, winner.currentSeats + 1);
      steps.push({ seat: round + 1, partyId: winner.party.id, quotient: winner.quotient, divisor: divisorForSeat(winner.currentSeats), tied });
    }
    return { awarded, steps };
  }

  function allocateHare(eligible, seats) {
    const eligibleVotes = eligible.reduce((sum, party) => sum + party.votes, 0);
    const rows = eligible.map(party => {
      const quota = eligibleVotes ? party.votes * seats / eligibleVotes : 0;
      const base = Math.floor(quota + EPSILON);
      return { party, quota, base, remainder: quota - base, extra: 0 };
    });
    let remaining = seats - rows.reduce((sum, row) => sum + row.base, 0);
    const ranked = [...rows].sort((a, b) => {
      if (!compareNumber(a.remainder, b.remainder)) return b.remainder - a.remainder;
      if (a.party.votes !== b.party.votes) return b.party.votes - a.party.votes;
      return a.party.id.localeCompare(b.party.id, "de");
    });
    const steps = [];
    for (let index = 0; index < remaining; index += 1) {
      const winner = ranked[index];
      const tied = ranked.filter(row => compareNumber(row.remainder, winner.remainder)).map(row => row.party.id);
      winner.extra = 1;
      steps.push({ seat: rows.reduce((sum, row) => sum + row.base, 0) + index + 1, partyId: winner.party.id, remainder: winner.remainder, tied });
    }
    return { awarded: new Map(rows.map(row => [row.party.id, row.base + row.extra])), rows, steps };
  }

  function allocateSeats({ method, parties, seats, threshold = 0 }) {
    if (!METHODS[method]) throw new Error("Unbekanntes Sitzverteilungsverfahren.");
    const seatCount = Math.max(0, Math.min(10000, Math.floor(safeNumber(seats))));
    const prepared = prepare(parties || [], threshold);
    let calculation = { awarded: new Map(), steps: [], rows: [] };
    if (seatCount && prepared.eligible.length) {
      if (method === "sainte-lague") calculation = highestAverages(prepared.eligible, seatCount, current => 2 * current + 1);
      if (method === "dhondt") calculation = highestAverages(prepared.eligible, seatCount, current => current + 1);
      if (method === "hare") calculation = allocateHare(prepared.eligible, seatCount);
    }
    const results = prepared.parties.map(party => {
      const partySeats = calculation.awarded.get(party.id) || 0;
      const seatShare = seatCount ? partySeats / seatCount * 100 : 0;
      return { ...party, seats: partySeats, seatShare, deviation: seatShare - party.voteShare };
    });
    const ties = calculation.steps.filter(step => step.tied.length > 1);
    const gallagher = Math.sqrt(0.5 * results.reduce((sum, row) => sum + (row.seatShare - row.voteShare) ** 2, 0));
    return { method, methodInfo: METHODS[method], seats: seatCount, ...prepared, results, gallagher, detail: calculation, ties };
  }

  return { METHODS, allocateSeats };
});
