const {assert} = require( "chai" );
const generateCode = require( '../index' );

// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
const seededRandom = (m_w = 123456789) => {
  let m_z = 987654321;
  const mask = 0xffffffff;

  return function random() {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    let result = ((m_z << 16) + m_w) & mask;
    result /= 4294967296;

    return result + 0.5;
  }
};

describe( "should generate DHIS2 compatible UIDs", () => {
  it( "should generate valid UIDs", () => {
    const code = generateCode();

    assert.isString( code );
    assert.lengthOf( code, 11, 'a valid UID is 11 chars long' );
    assert.isNotNumber( code[0], 'a valid UID should not start with a number' );
  } );

  it( "should generate the same random UIDs if seeded with same seed", () => {
    const randomFn = seededRandom( 123123 );
    const arr = [];

    for ( let i = 0; i < 10; i++ ) {
      arr.push( generateCode( 11, randomFn ) );
    }

    assert.equal( "yKsLePZEg44", arr[0] );
    assert.equal( "kfN3vElj7in", arr[1] );
    assert.equal( "RTSp1yfraiu", arr[8] );
    assert.equal( "v2wejz8CGLb", arr[9] );
  } );
} );