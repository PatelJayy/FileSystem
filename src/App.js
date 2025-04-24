import { useState } from "react";
import "./styles.css";
import json from "./data.json";

// render list of objects
const List = ({ list, addNodeToList, deleteNodeFromList }) => {
  const [isExpanded, setIsExpanded] = useState({});
  return (
    <div className="container">
      {list.map((node) => (
        <div key={node.id}>
          {node.isFolder && (
            <span
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [node.name]: !prev[node.name],
                }))
              }
            >
              {isExpanded?.[node.name] ? "- " : "+ "}
            </span>
          )}
          <span>{node.name}</span>
          {node.isFolder && (
            <span onClick={() => addNodeToList(node.id)}>
              <img
                className="icon"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfMt43f5llkF5OgPwtIozkZk38jQu2r-3XCg&s"
                alt=""
              />
            </span>
          )}
          <span onClick={() => deleteNodeFromList(node.id)}>
            <img
              className="icon"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAABWVlbV1dUeHh7u7u6Ojo6tra19fX27u7tZWVkkJCSxsbFqamr4+PihoaGWlpZxcXFBQUFOTk7j4+PBwcHPz88vLy/d3d2NjY0TExMqKirs7OxEREQ0NDSamppgYGAMDAx6enoXFxem5IjtAAAD5ElEQVR4nO3da2OaMBhAYfB+Qbxf62xt//9/nCurENQQwxsSt/N8hUrOFGUCJooAAAAAAACAVzYcLMYdc+PFYOh7yM84DmIbg6PvgZuaWvX9MfU9dDMT68A4nvgevIlljcA4XvoefrU6z+BLPIvDmoFxHPh7anqoXfiV+o7Qsn8bzYX9hroQKFz4jtBZCQTG8cp3hkZfpDDxnaGxFync+87QsDseLRv4ztBQC/tdU/0XLTT/7B5SGAwKH6EwHBQ+QmE4KHyEwnD8b4Vr479b+yzcDEYtU6M3ZaQL078cqV9+vD2xxcGmZl+3FYeuVeu7uePZ9/gNHLo1CiW+OnPvl33guvrRg2C/L9Y9B9EU+3MdJ99DN3SyLtz6HrqhrXXhL99DN2T/VvPue+iG3q0Lu76HbqjGB6LMeQjX+vaBr/E6tX+NfmuHfmC6bNcLvFi1FTv1Wouk7VqiBu3UpS7ONY6ULdb/F6zSVrY3cr69KGp5LWw53x6F8iiUR6E0CuVRKI1CeRRKo1AehdIolEehNArlUSiNQnkUSqNQHoWqdD3bzx5dK7G5LFtXXfATeGHS+V5re+8St3V2mUCn4jansAt71/Vuz2LmZ19n2scIurB4Yqz8St0UlmmfxZAL005hxfJ9k8Vrdca6fTHkQvWisZ2ybKcs012JGnLhTFlTfSmqZ3Z1e2LIhT1lTfW9Rr3Ko6d5FArlUZijkMIMhfIozFFIYYZCeRTmKKQwQ6E8CnMUUpihUB6FOQopzFAoj8IchRRmKJRHYY5CCjMUyqMwRyGFGQrlUZijkMIMhfIozFFIYYZCeRTmKKQwQ6E820LdPTOvWjjUrKmOWzfHQMiFaXHFTmlh8b6286veu6bM91i+Pa34BGvndAy6MJpf17vd0/K9dK59jLALf27QO9+7SzT5O2ep/ibZ0Auj43Q+mSf3f6w5TS7L+lVTVYdeWB+F8iiURqE8CqVRKI9CaRTKo1AahfIolEahPAqlUSjv3y9UZ0OqO5VrtY2yvSZmQ/pQtljxZacA9TfRPpxvL4o+lS3WmOXUkDoJ46fz7d3Mp2c+NbUd9QRWvXnyDKn7RRy7mPkstyptzf1+H0XpubRR8+m3n1eer1d7Hk7MR2mr8bK/67qw6y/Lm7KfF/cZPudBdvl6KTh4Czw0E1i6yqBJFT85LMfXhOTl37F1p/yB0RT3B8FXs+rROOD+CLHAx6zrzXxSXDU/iW4T/28qSpt+FieNHM0oetWjErRvvO9ic6oemJBtEwfc90w71YMT8DVt/hX6I01ujo3FLRN/fVnkejY6jTsujE+j2dBzHgAAAAAAAGDqN1jISn+BVUnmAAAAAElFTkSuQmCC"
              alt=""
            />
          </span>
          {isExpanded?.[node.name] && node?.children && (
            <List
              list={node.children}
              addNodeToList={addNodeToList}
              deleteNodeFromList={deleteNodeFromList}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [data, setData] = useState(json);

  const addNodeToList = (parentId) => {
    const name = prompt("enter name");

    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now().toString(),
                name: name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };

    setData((prev) => updateTree(prev));
  };

  const deleteNodeFromList = (itemId) => {
    const updateTree = (list) => {
      return list
        .filter((node) => node.id !== itemId)
        .map((node) => {
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }
          return node;
        });
    };

    setData((prev) => updateTree(prev));
  };

  return (
    <div className="App">
      <h1>File folder explorer</h1>
      <List
        list={data}
        addNodeToList={addNodeToList}
        deleteNodeFromList={deleteNodeFromList}
      />
    </div>
  );
}
