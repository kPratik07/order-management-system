const Select = ({ value, onChange, options, ...props }) => (
  <select
    value={value}
    onChange={onChange}
    {...props}
    className="border px-2 py-1 rounded"
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default Select;
