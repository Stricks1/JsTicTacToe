import playerFactory from '../src/player';

describe('player Model', () => {
  test('Check if the player created is an object', () => {
    const player = playerFactory();
    expect(typeof player).toBe('object');
  });

  test('Check if the player created object has marker and name properties', () => {
    const player = playerFactory();
    expect(Object.prototype.hasOwnProperty.call(player, 'name')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(player, 'marker')).toBe(true);
  });

  test('it creates a player and check his name', () => {
    const player = playerFactory('test', 'X');
    expect(player.name).toBe('test');
  });

  test('it creates a player and check his marker', () => {
    const player = playerFactory('player', 'O');
    expect(player.marker).toBe('O');
  });

  test('it return undefined properties if no arguments are passed', () => {
    const player = playerFactory();
    expect(player.marker).toBeUndefined();
    expect(player.name).toBeUndefined();
  });
});
