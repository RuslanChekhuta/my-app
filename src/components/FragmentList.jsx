import { Fragment } from "react";

const FragmentList = ({ items }) => {
  // TODO: Реализуйте логику здесь.
  return (
    <>
      <h3>Термины</h3>
      <hr />
      <dl>
        {items.map((item) => (
          <Fragment key={item.id}>
            <dt>{item.term}</dt>
            <dd>Это описание для термина {item.term}.</dd>
          </Fragment>
        ))}
      </dl>
    </>
  );
};

export default FragmentList;
