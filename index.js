// return a random value from given array
const sample = (d = [], fn = Math.random) => {
  if ( d.length === 0 ) return;
  return d[Math.round( fn() * (d.length - 1) )];
};

const generateCode = (limit = 11, fn = Math.random) => {
  const allowedLetters = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"].join( '' );
  const allowedChars = ['0123456789', allowedLetters].join( '' );

  const arr = [sample( allowedLetters, fn )];

  for ( let i = 0; i < limit - 1; i++ ) {
    arr.push( sample( allowedChars, fn ) );
  }

  return arr.join( '' );
};

module.exports = generateCode;