import { expect } from 'chai';
import necronomicon from './necronomicon.js';

describe('Necronomicon', () => {
  describe('document', () => {
    it('generates documentation for available commands', () => {
      const necro = necronomicon({
        commands: [
          {
            name: 'summonDemon',
            validate: (attributes, body) => attributes.name && attributes.power,
            execute: (attributes, body) => `Summoning demon ${attributes.name} with power ${attributes.power}`,
            example: {
              attributes: { name: 'Belial', power: 666 },
              body: undefined
            },
            description: 'Summons a demon'
          },
          {
            name: 'curseTarget',
            validate: (attributes, body) => attributes.victim && body,
            execute: (attributes, body) => `Cursing ${attributes.victim}: ${body}`,
            example: {
              attributes: { victim: 'Dr. Woe' },
              body: 'May the flesh of the wicked one wither and rot!'
            },
            description: 'Curses a target'
          }
        ],
        symbols: {
          directive: '/',
          attribute: ':',
          body: '{}'
        }
      });

      const doc = necro.document();
      expect(doc).to.include('# Directive syntax');
      expect(doc).to.include('# Available commands');
      expect(doc).to.include('summonDemon');
      expect(doc).to.include('curseTarget');
    });
  });

  describe('execute', () => {
    it('executes commands in the provided text', () => {
      const necro = necronomicon({
        commands: [
          {
            name: 'summonDemon',
            validate: (attributes, body) => attributes.name && attributes.power,
            execute: (attributes, body) => `Summoning demon ${attributes.name} with power ${attributes.power}`,
            example: {
              attributes: { name: 'Belial', power: 666 },
              body: undefined
            },
            description: 'Summons a demon'
          },
          {
            name: 'curseTarget',
            validate: (attributes, body) => attributes.victim && body,
            execute: (attributes, body) => `Cursing ${attributes.victim}: ${body}`,
            example: {
              attributes: { victim: 'Dr. Woe' },
              body: 'May the flesh of the wicked one wither and rot!'
            },
            description: 'Curses a target'
          }
        ],
        symbols: {
          directive: '/',
          attribute: ':',
          body: '{}'
        }
      });

      const text = `
/summonDemon(name:Belial, power:666)
/curseTarget(victim:Dr. Woe) {
May the flesh of the wicked one wither and rot!
} curseTarget!
`;

      const result = necro.execute(text);
      expect(result).to.include('Summoning demon Belial with power 666');
      expect(result).to.include('Cursing Dr. Woe: May the flesh of the wicked one wither and rot!');
    });

    it('ignores unknown commands', () => {
      const necro = necronomicon({
        commands: [
          {
            name: 'summonDemon',
            validate: (attributes, body) => attributes.name && attributes.power,
            execute: (attributes, body) => `Summoning demon ${attributes.name} with power ${attributes.power}`,
            example: {
              attributes: { name: 'Belial', power: 666 },
              body: undefined
            },
            description: 'Summons a demon'
          }
        ],
        symbols: {
          directive: '/',
          attribute: ':',
          body: '{}'
        }
      });

      const text = `
/summonDemon(name:Belial, power:666)
/curse(victim:Dr. Woe) {
May the flesh of the wicked one wither and rot!
} curse!
`;

      const result = necro.execute(text);
      expect(result).to.include('Summoning demon Belial with power 666');
      expect(result).not.to.include('Cursing Dr. Woe: May the flesh of the wicked one wither and rot!');
    });
  });
});