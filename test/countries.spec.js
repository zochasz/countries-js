import { expect } from 'chai'
import data from '../data/countries'
import Country from '../src/country'
import Countries from '../src/countries'
import { Africa, Europe } from '../src/regions'
import { EasternEurope, MiddleAfrica } from '../src/subregions'

describe('Countries test', () => {
  const countries = new Countries(data.map(i => new Country(i)))

  describe('Can include iso-3166 alpha-2 codes', () => {
    it('Should return countries with alpha-2 codes AG, KZ, UG', () => {
      const filtered = countries.include('isoA2', ['AG', 'KZ', 'UG'])
      expect(filtered.all.map(v => v.isoA2))
        .to.be.an('array')
        .that.includes('AG')
        .includes('KZ')
        .includes('UG')
    })
  })

  describe('Can exclude iso-3166 alpha-2 codes', () => {
    it('Should return countries without alpha-2 codes AG, KZ, UG', () => {
      const filtered = countries.exclude('isoA2', ['AG', 'KZ', 'UG'])
      expect(filtered.all.map(v => v.isoA2))
        .to.be.an('array')
        .that.not.includes('AG')
        .not.includes('KZ')
        .not.includes('UG')
    })
  })

  describe('Can include iso-3166 alpha-3 codes', () => {
    it('Should return countries with alpha-3 codes ATA, AUS, AIA', () => {
      const filtered = countries.include('isoA3', ['ATA', 'AUS', 'AIA'])
      expect(filtered.all.map(v => v.isoA3))
        .to.be.an('array')
        .that.includes('ATA')
        .includes('AUS')
        .includes('AIA')
    })
  })

  describe('Can exclude iso-3166 alpha-3 codes', () => {
    it('Should return countries without alpha-3 codes ATA, AUS, AIA', () => {
      const filtered = countries.exclude('isoA3', ['ATA', 'AUS', 'AIA'])
      expect(filtered.all.map(v => v.isoA3))
        .to.be.an('array')
        .that.not.includes('ATA')
        .not.includes('AUS')
        .not.includes('AIA')
    })
  })

  describe('Can include iso-3166 numeric-3 codes', () => {
    it('Should return countries with numeric-3 codes 016, 854, 108', () => {
      const filtered = countries.include('isoN3', ['016', '854', '108'])
      expect(filtered.all.map(v => v.isoN3))
        .to.be.an('array')
        .that.includes('016')
        .includes('854')
        .includes('108')
    })
  })

  describe('Can exclude iso-3166 numeric-3 codes', () => {
    it('Should return countries without numeric-3 codes 016, 854, 108', () => {
      const filtered = countries.exclude('isoN3', ['016', '854', '108'])
      expect(filtered.all.map(v => v.isoN3))
        .to.be.an('array')
        .that.not.includes('016')
        .not.includes('854')
        .not.includes('108')
    })
  })

  describe('Can include regions', () => {
    it('Should return countries within Europe and Africa', () => {
      const filtered = countries.include('region', [Africa, Europe])
      expect(Array.from(new Set(filtered.all.map(v => v.region))))
        .to.be.an('array')
        .that.includes(Europe)
        .includes(Africa)
    })
  })

  describe('Can exclude regions', () => {
    it('Should return countries outside of Europe and Africa', () => {
      const filtered = countries.exclude('region', [Africa, Europe])
      expect(Array.from(new Set(filtered.all.map(v => v.region))))
        .to.be.an('array')
        .that.not.includes(Europe)
        .not.includes(Africa)
    })
  })

  describe('Can include subregions', () => {
    it('Should return countries within Eastern Europe and Middle Africa', () => {
      const filtered = countries.include('subregion', [
        EasternEurope,
        MiddleAfrica,
      ])
      expect(Array.from(new Set(filtered.all.map(v => v.subregion))))
        .to.be.an('array')
        .that.includes(EasternEurope)
        .includes(MiddleAfrica)
    })
  })

  describe('Can exclude subregions', () => {
    it('Should return countries outside of Eastern Europe and Middle Africa', () => {
      const filtered = countries.exclude('subregion', [
        EasternEurope,
        MiddleAfrica,
      ])
      expect(Array.from(new Set(filtered.all.map(v => v.subregion))))
        .to.be.an('array')
        .that.not.includes(EasternEurope)
        .not.includes(MiddleAfrica)
    })
  })

  describe('Can perform multiply filters', () => {
    it(
      'Should return countries within Europe and Africa ' +
        'but outside of Eastern Europe and Middle Africa ' +
        'which ISOa2 codes are not equal to IT, ES and FR',
      () => {
        const filtered = countries
          .include('region', [Europe, Africa])
          .exclude('subregion', [EasternEurope, MiddleAfrica])
          .exclude('isoA2', ['IT', 'ES', 'FR'])
        const codes = filtered.all.map(v => v.isoA2)
        const regions = Array.from(new Set(filtered.all.map(v => v.region)))
        const subregions = Array.from(
          new Set(filtered.all.map(v => v.subregion))
        )
        expect(codes)
          .to.be.an('array')
          .that.not.includes('IT')
          .not.includes('ES')
          .not.includes('FR')
        expect(regions)
          .to.be.an('array')
          .that.includes(Europe)
          .includes(Africa)
        expect(subregions)
          .to.be.an('array')
          .that.not.includes(EasternEurope)
          .not.includes(MiddleAfrica)
      }
    )
  })

  describe('Can not filter outside of the set', () => {
    it("Will fail since set don't have an expected values", () => {
      expect(() => {
        countries
          .include('region', [Europe])
          .include('isoA2', ['US', 'AR', 'CL'])
      }).to.throw()
    })
  })

  describe('Can not filter by invalid region', () => {
    it("Will fail since set don't have an expected values", () => {
      expect(() => {
        countries.include('region', ['Space'])
      }).to.throw()
    })
  })

  describe('Can not filter by invalid subregion', () => {
    it("Will fail since set don't have an expected values", () => {
      expect(() => {
        countries.include('subregion', ['Space and Time'])
      }).to.throw()
    })
  })

  describe('Can not filter by invalid isoA2', () => {
    it("Will fail since set don't have an expected values", () => {
      expect(() => {
        countries.include('isoA2', ['XX'])
      }).to.throw()
    })
  })

  describe('Can not filter by invalid isoA3', () => {
    it("Will fail since set don't have an expected values", () => {
      expect(() => {
        countries.include('isoA3', ['XXX'])
      }).to.throw()
    })
  })

  describe('Can not filter by invalid isoN3', () => {
    it("Will fail since set don't have an expected values", () => {
      expect(() => {
        countries.include('isoN3', ['000'])
      }).to.throw()
    })
  })
})
