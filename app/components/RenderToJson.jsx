import { TipTapRender } from "@troop.com/tiptap-react-render";

const doc = (props) => {
  return <>{props.children}</>;
};
const paragraph = (props) => {
  return <p>{props.children}</p>;
};

const text = (props) => {
  return <span>{props.node.text}</span>;
};

const handlers = {
  paragraph: paragraph,
  text: text,
  doc: doc,
};

export function RenderToJson({ data }) {
  return (
    <div className="px-2 pt-2 prose">
      <TipTapRender handlers={handlers} node={data} />
    </div>
  );
}
