export const JSONToQuery = (q: JSONQuery) => {
  const stringQ = {} as Record<string, string>;

  for (const key in q) {
    if (Object.prototype.hasOwnProperty.call(q, key)) {
      const val = q[key];
      if (val) {
        stringQ[key] = val.toString();
      }
    }
  }

  const qp = new URLSearchParams(stringQ);
  for (const q of qp.entries()) {
    const [key, value] = q;
    console.log(key, value);
    if (value.includes("true")) {
      qp.set(key, "!=null");
    } else if (value.includes("false")) {
      qp.set(key, "");
    }
  }
  console.log(qp);

  return qp;
};
