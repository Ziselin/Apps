"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { allocateSeats } = require("./allocation-engine.js");
const parties = values => values.map(([name, votes], index) => ({ id: `p${index + 1}`, name, votes }));
const run = (method, values, seats, threshold = 0) => allocateSeats({ method, parties: parties(values), seats, threshold });

for (const method of ["sainte-lague", "dhondt", "hare"]) {
  test(`${method}: vergibt exakt alle Sitze`, () => {
    const result = run(method, [["A", 42], ["B", 31], ["C", 17], ["D", 10]], 37);
    assert.equal(result.results.reduce((sum, row) => sum + row.seats, 0), 37);
  });
  test(`${method}: Sperrklausel gilt einschließlich Grenzwert`, () => {
    const result = run(method, [["A", 90], ["B", 5], ["C", 4.9], ["Rest", .1]], 20, 5);
    assert.ok(result.results.find(row => row.name === "B").eligible);
    assert.equal(result.results.find(row => row.name === "C").seats, 0);
  });
  test(`${method}: eine Partei erhält alle Sitze`, () => assert.deepEqual(run(method, [["A", 100]], 19).results.map(row => row.seats), [19]));
}

test("bekannter Vergleichsfall mit 7 Sitzen", () => {
  const values = [["A", 38], ["B", 27], ["C", 19], ["D", 10], ["E", 6]];
  assert.deepEqual(run("sainte-lague", values, 7).results.map(row => row.seats), [3, 2, 1, 1, 0]);
  assert.deepEqual(run("dhondt", values, 7).results.map(row => row.seats), [3, 2, 1, 1, 0]);
  assert.deepEqual(run("hare", values, 7).results.map(row => row.seats), [3, 2, 1, 1, 0]);
});

test("D’Hondt: Höchstzahlen ergeben erwartete Verteilung", () => assert.deepEqual(run("dhondt", [["A", 100], ["B", 60], ["C", 40]], 5).results.map(row => row.seats), [3, 1, 1]));
test("Hare/Niemeyer: größte Reste erhalten Zusatzsitze", () => assert.deepEqual(run("hare", [["A", 44], ["B", 35], ["C", 21]], 7).results.map(row => row.seats), [3, 2, 2]));
test("kleines Parlament zeigt einen echten Verfahrensunterschied", () => {
  const values = [["A", 52], ["B", 25], ["C", 15], ["D", 8]];
  assert.deepEqual(run("sainte-lague", values, 7).results.map(row => row.seats), [3, 2, 1, 1]);
  assert.deepEqual(run("dhondt", values, 7).results.map(row => row.seats), [4, 2, 1, 0]);
  assert.deepEqual(run("hare", values, 7).results.map(row => row.seats), [4, 2, 1, 0]);
});
test("Gleichstände werden erkannt und deterministisch entschieden", () => {
  const result = run("dhondt", [["A", 10], ["B", 10]], 1);
  assert.equal(result.ties.length, 1);
  assert.deepEqual(result.results.map(row => row.seats), [1, 0]);
});
test("Null Sitze und leere Stimmen crashen nicht", () => assert.equal(run("hare", [["A", 0], ["B", 0]], 0).results.reduce((sum, row) => sum + row.seats, 0), 0));
