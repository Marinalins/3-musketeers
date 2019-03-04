const starWars = require('./index');
const starWarsNames = require('./starwars-names.json');

describe('starwars-names', () => {
  describe('all', () => {
    test('should be a fulfilled array', () => {
      expect(starWars.all).toHaveLength(starWarsNames.length)
    });
    test('should be an array of strings', () => {
      for(var i = 0; i<starWars.all.length; i++){
        expect(starWars.all[i].constructor.name).toMatch('String');
      }
    });

    test('should contain `Luke Skywalker`', () => {
      var luke = false;
      for(var i = 0; i<starWars.all.length; i++){
        if(starWars.all[i] === 'Luke Skywalker'){
          luke = true;
        }
      }
      expect(luke).toBeTruthy();
    });

    test('should not contain `Ben Quadinaros`', () => {
      expect(starWars.all).not.toContain('Ben Quadinaros');
    });
  });

  describe('random', () => {
    test('should return a random item from the starWars.all', () => {
      var item = starWars.random();
      expect(starWars.all).toContain(item);
    });

    test('should return an array of random items if passed a number', () => {
      var number = 3;
      expect(starWars.random(number).length).toBe(3);
    });
  });
});
