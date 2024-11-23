import { expect } from 'chai';
import necronomicon from './necronomicon.js';

const symbols = { directive: '/', attribute: ':', body: '{}' };
const summon = {
  name: 'summonDemon',
  validate: (attributes, body) => attributes.name && attributes.power,
  execute: (attributes, body) => `Summoning demon ${attributes.name} with power ${attributes.power}`,
  example: {
    attributes: { name: 'Belial', power: 666 },
    body: undefined
  },
  description: 'Summons a demon'
};
const curse = {
  name: 'curseTarget',
  validate: (attributes, body) => attributes.victim && body,
  execute: (attributes, body) => `Cursing ${attributes.victim}: ${body}`,
  example: {
    attributes: { victim: 'Dr. Woe' },
    body: 'May the flesh of the wicked one wither and rot!'
  },
  description: 'Curses a target'
};
const commands = [summon, curse];
const options = { commands, symbols };
const text = `
/summonDemon(name:Belial, power:666)
Hoo! Hah! Foo! Fah!
/curseTarget(victim:Dr. Woe) {
May the flesh of the wicked one wither and rot!
} curseTarget!
`;

describe('Necronomicon', () => {
  describe('document', () => {
    it('generates documentation for available commands', () => {
      const doc = necronomicon(options).document();
      expect(doc).to.include('# Directive syntax');
      expect(doc).to.include('# Available commands');
      expect(doc).to.include('summonDemon');
      expect(doc).to.include('curseTarget');
    });
  });

  describe('execute', () => {
    it('executes commands in the provided text', () => {
      const result = necronomicon(options).execute(text);
      expect(result).to.include('/summonDemon(name:Belial,power:666) {');
      expect(result).to.include('Summoning demon Belial with power 666');
      expect(result).to.include('/curseTarget(victim:Dr. Woe) {');
      expect(result).to.include('Cursing Dr. Woe: May the flesh of the wicked one wither and rot!');
    });

    it('renders results in the same directive syntax', () => {
      const result = necronomicon(options).execute(text);
      expect(result).to.include('/summonDemon(name:Belial,power:666) {');
      expect(result).to.include('/curseTarget(victim:Dr. Woe) {');
    });

    it('excludes text when not specified', () => {
      const includes = { results: true, text: false, directives: true };
      const result = necronomicon({ ...options, includes }).execute(text);
      expect(result).not.to.include('Hoo! Hah! Foo! Fah!');
    });

    it('excludes command output when directives are disabled', () => {
      const necro = necronomicon({ ...options, includes: { directives: false } });
      const result = necro.execute(text);
      expect(result).not.to.include('/summonDemon(name:Belial,power:666) {');
      expect(result).to.include('Summoning demon Belial with power 666');
      expect(result).not.to.include('/curseTarget(victim:Dr. Woe) {');
      expect(result).to.include('Cursing Dr. Woe: May the flesh of the wicked one wither and rot!');
    });

    it('ignores unknown commands', () => {
      const necro = necronomicon({ commands: [summon], symbols });
      const result = necro.execute(text);
      expect(result).to.include('/summonDemon(name:Belial,power:666) {');
      expect(result).to.include('Summoning demon Belial with power 666');
      expect(result).not.to.include('/curseTarget(victim:Dr. Woe) {');
      expect(result).not.to.include('Cursing Dr. Woe: May the flesh of the wicked one wither and rot!');
    });

    it('includes text when specified', () => {
      const includes = { results: false, text: true, directives: true };
      const result = necronomicon({ ...options, includes }).execute(text);
      expect(result).to.include('Hoo! Hah! Foo! Fah!');
    });
  });
});