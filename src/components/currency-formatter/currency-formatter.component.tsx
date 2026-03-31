type CurrencyFormatterProps = {
  price: number;
  currencyCode: string;
  locale: string;
};

export const CurrencyFormatter = ({
  price,
  currencyCode,
  locale,
}: CurrencyFormatterProps) => {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(price);

  return <span>{formattedValue}</span>;
};
