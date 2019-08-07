import { expect } from 'chai'
import { countries, regions, subregions } from '../src'

const { Africa, Europe } = regions
const { EasternEurope, MiddleAfrica } = subregions

describe('Countries tests', () => {
  describe('Can filter by including countries with specific iso-3166 alpha-2 codes', () => {
    it('Must return only countries with iso-3166 alpha-2 codes equal to AG, KZ, UG', () => {
      expect(
        countries.include('isoA2', ['AG', 'KZ', 'UG']).all.map(v => v.isoA2)
      )
        .to.be.an('array')
        .that.include.members(['AG', 'KZ', 'UG'])
    })
  })
  describe('Can filter by excluding countries with specific iso-3166 alpha-2 codes', () => {
    it('Must return only countries with iso-3166 alpha-2 codes not equal to AG, KZ, UG', () => {
      expect(
        countries.exclude('isoA2', ['AG', 'KZ', 'UG']).all.map(v => v.isoA2)
      )
        .to.be.an('array')
        .that.not.include.members(['AG', 'KZ', 'UG'])
    })
  })
  describe('Can filter by including countries with specific iso-3166 alpha-3 codes', () => {
    it('Must return only countries with iso-3166 alpha-3 codes equal to ATA, AUS, AIA', () => {
      expect(
        countries.include('isoA3', ['ATA', 'AUS', 'AIA']).all.map(v => v.isoA3)
      )
        .to.be.an('array')
        .that.include.members(['ATA', 'AUS', 'AIA'])
    })
  })
  describe('Can filter by excluding countries with specific iso-3166 alpha-3 codes', () => {
    it('Must return only countries with iso-3166 alpha-3 codes not equal to ATA, AUS, AIA', () => {
      expect(
        countries.exclude('isoA3', ['ATA', 'AUS', 'AIA']).all.map(v => v.isoA3)
      )
        .to.be.an('array')
        .that.not.include.members(['ATA', 'AUS', 'AIA'])
    })
  })
  describe('Can filter by including countries with specific iso-3166 numeric codes', () => {
    it('Must return only countries with iso-3166 numeric codes equal to 016, 854, 108', () => {
      expect(
        countries.include('isoN3', ['016', '854', '108']).all.map(v => v.isoN3)
      )
        .to.be.an('array')
        .that.include.members(['016', '854', '108'])
    })
  })
  describe('Can filter by excluding countries with specific iso-3166 numeric codes', () => {
    it('Must return only countries with iso-3166 numeric codes not equal to 016, 854, 108', () => {
      expect(
        countries.exclude('isoN3', ['016', '854', '108']).all.map(v => v.isoN3)
      )
        .to.be.an('array')
        .that.not.include.members(['016', '854', '108'])
    })
  })
  describe('Can filter by including countries located in specific regions', () => {
    it('Must return only countries located in Europe and Africa', () => {
      expect(
        Array.from(
          new Set(
            countries.include('region', [Europe, Africa]).all.map(v => v.region)
          )
        )
      )
        .to.be.an('array')
        .that.include.members([Europe, Africa])
    })
  })
  describe('Can filter by excluding countries located in specific regions', () => {
    it('Must return only countries not located in Europe and Africa', () => {
      expect(
        Array.from(
          new Set(
            countries.exclude('region', [Europe, Africa]).all.map(v => v.region)
          )
        )
      )
        .to.be.an('array')
        .that.not.include.members([Europe, Africa])
    })
  })
  describe('Can filter by including countries located in specific subregion', () => {
    it('Must return only countries located in Eastern Europe and Middle Africa', () => {
      expect(
        Array.from(
          new Set(
            countries
              .include('subregion', [EasternEurope, MiddleAfrica])
              .all.map(v => v.subregion)
          )
        )
      )
        .to.be.an('array')
        .that.include.members([EasternEurope, MiddleAfrica])
    })
  })
  describe('Can filter by excluding countries located in specific subregion', () => {
    it('Must return only countries not located in Eastern Europe and Middle Africa', () => {
      expect(
        Array.from(
          new Set(
            countries
              .exclude('subregion', [EasternEurope, MiddleAfrica])
              .all.map(v => v.subregion)
          )
        )
      )
        .to.be.an('array')
        .that.not.include.members([EasternEurope, MiddleAfrica])
    })
  })
  describe('Can filter by correctly combining multiply includes/excludes', () => {
    it(
      'Must return countries located in Europe and Africa, ' +
        'not in Eastern Europe or Middle Africa, ' +
        'with iso-3166 alpha-2 codes not equal to IT, ES or FR',
      () => {
        const filtered = countries
          .include('region', [Europe, Africa])
          .exclude('subregion', [EasternEurope, MiddleAfrica])
          .exclude('isoA2', ['IT', 'ES', 'FR']).all
        const regions = Array.from(new Set(filtered.map(v => v.region)))
        const subregions = Array.from(new Set(filtered.map(v => v.subregion)))
        const isoA2Codes = filtered.map(v => v.isoA2)
        expect(regions)
          .to.be.an('array')
          .that.include.members([Europe, Africa])
        expect(subregions)
          .to.be.an('array')
          .that.not.include.members([EasternEurope, MiddleAfrica])
        expect(isoA2Codes)
          .to.be.an('array')
          .that.not.include.members(['IT', 'ES', 'FR'])
      }
    )
  })
  describe('Can not filter by including/excluding values outside the set', () => {
    it('Must fail, since the subset does not include US', () => {
      expect(() => {
        countries.include('region', [Europe]).include('isoA2', ['US'])
      }).to.throw()
    })
  })
  describe('Can not filter by using incorrect region values', () => {
    it('Must fail, sice "Space" is not a region of the planet Earth', () => {
      expect(() => {
        countries.include('region', ['Space'])
      }).to.throw()
    })
  })
  describe('Can not filter by using incorrect subregion values', () => {
    it('Must fail, since "Death Star" is not a subregion of planet Earth', () => {
      expect(() => {
        countries.include('subregion', ['Death Star'])
      }).to.throw()
    })
  })
  describe('Can not filter by using incorrect iso-3166 alpha-2 code', () => {
    it('Must fail, since XX is not a correct iso-3166 alpha-2 code', () => {
      expect(() => {
        countries.include('isoA2', ['XX'])
      }).to.throw()
    })
  })
  describe('Can not filter by using incorrect iso-3166 alpha-3 code', () => {
    it('Must fail, since XXX is not a correct iso-3166 alpha-3 code', () => {
      expect(() => {
        countries.include('isoA3', ['XXX'])
      }).to.throw()
    })
  })
  describe('Can not filter by using incorrect iso-3166 numeric code', () => {
    it('Must fail, since 000 is not a correct iso-3166 numeric code', () => {
      expect(() => {
        countries.include('isoN3', ['000'])
      }).to.throw()
    })
  })
})
