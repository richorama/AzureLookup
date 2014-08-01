function toBuffer(str) {
  var parts = str.split('.');
  if(parts.length != 4) {
    throw new Error('Not IPv4 address: ' + str);
  }
  var b = new Buffer([0,0,0,0]);
  for(var i = 0; i < 4; i++) {
    var n = parseInt(parts[i], 10);
    if(n < 0 || n > 255) {
      throw new Error('Not IPv4 address: ' + str);
    }
    b[i] = n;
  }
  return b;
}

function mask(len) {
  var b = new Buffer([0,0,0,0]);
  for(var i = 0; i < 32; i++) {
    b[Math.floor(i/8)] |= (i < len ? 128 : 0) >> (i % 8);
  }
  return b;
}

module.exports = function(cidr) {
  var parts = cidr.split('/');
  if(parts.length != 2) {
    throw new Error('Not CIDR format: ' + cidr);
  }
  var maskLength = parseInt(parts[1]);
  if(maskLength < 0 || maskLength > 32) {
    throw new Error('Not CIDR format: ' + cidr);
  }
  var subnetMask = mask(maskLength);
  var subnet = toBuffer(parts[0]);
  return function(ip) {
    ip = toBuffer(ip);
    for(var i = 0; i < 4; i++) {
      if((ip[i] & subnetMask[i]) != (subnet[i] & subnetMask[i])) {
        return false;
      }
    }
    return true;
  };
};