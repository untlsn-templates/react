interface ButtonProps {
  onChange(count: number): void
  defaultCount: number
}

function Button(props: ButtonProps) {
  const [count, setCount] = useState(props.defaultCount);

  useEffect(() => {
    setCount(props.defaultCount);
  }, [props.defaultCount]);

  return (
    <button
      type="button"
      className="border-2 px-2 py-1 rounded-xl hover:bg-white/20"
      onClick={() => {
        const newCount = count + 1;
        setCount(newCount);
        props.onChange(newCount);
      }}
    >
      count is: {count}
    </button>
  );
}

export default Button;
