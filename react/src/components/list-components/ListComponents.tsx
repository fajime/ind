type List = {
  components: string[];
  setComp: (comp: string) => void;
};

export const ListComponents = ({ components, setComp }: List) => {
  return (
    <>
      {components.map((item, index) => {
        return (
          <div className="item-list" onClick={() => setComp(item)} key={index}>
            {item}
          </div>
        );
      })}
    </>
  );
};
