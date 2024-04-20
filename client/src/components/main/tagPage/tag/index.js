import "./index.css";

const Tag = ({ t, clickTag }) => {
    console.log(t);
    return (
        <div
            className="tagNode"
            onClick={() => {
                clickTag(t.name);
            }}
        >
            <div className="tagName">{t.name}</div>
            <div>{t.qcnt} questions</div>
        </div>
    );
};

export default Tag;
