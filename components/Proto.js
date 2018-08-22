
export function initProto()
{
  String.prototype.trim = function (length) {
    return this.length > length ? this.substring(0, length) + "." : this;
  }

}