import React, { useState } from "react";

const InputError = (errorType) => {
  const [error, setError] = useState();
  switch (errorType) {
    case "required":
      setError("Заавал тус талбарыг бөглөх шаардлагатай");
      break;
    case "number":
      setError("Зөвхөн тоо оруулах боломжтой");
      break;
    case true:
      setError(null);
    default:
      setError(`Заавал ${errorType} - ыг баримтлах ёстой`);
  }

  return <p>{error !== null && error}</p>;
};

export default InputError;
