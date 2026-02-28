import React, { memo } from "react";

const List = memo(({ items, onItemClick }) => {
  console.log("Лист отрендерен заново");
  return (
    <div>
      {items.map((item) => (
        <div key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});

export default List;
