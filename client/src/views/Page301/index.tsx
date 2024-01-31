import React from "react";
import styles from "./index.module.scss";
import useDraggable from "@/hooks/useDraggable";

const Sort: React.FunctionComponent = () => {
  /* 随机生成应用列表 */
  // const getAppList = () => {
  //   const tempArr: any[] = [];
  //   for (let index = 1; index < 10; index++) {
  //     tempArr.push({
  //       id: index,
  //       name: `应用${index}`,
  //       backgroundColor: getRandomColor(),
  //     });
  //   }
  //   return tempArr;
  // };

  /* 随机生成背景颜色 */
  const getRandomColor = () => {
    let letter = `0123456789ABCDEF`;
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letter[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const {
    // 当前拖拽对象类
    oldDragItem,
    // 拖拽交换对象类
    newDragItem,
    // 是否拖拽类
    isActive,
    // 是否拖拽进行类
    isEnter,
    list,
    onDragStart,
    onDragEnter,
    onDragEnd,
  } = useDraggable(getAppList);
  return (
    <ul className={styles.list}>
      {list?.map((item: any) => (
        <li
          style={{
            backgroundColor: item.backgroundColor,
          }}
          className={
            oldDragItem == item && isActive == item.id
              ? styles.active
              : newDragItem == item && isEnter == item.id
              ? styles.enter
              : item
          }
          key={item.id}
          //开启拖拽
          draggable={true}
          onDragStart={() => {
            onDragStart(item);
          }}
          onDragEnter={() => {
            onDragEnter(item);
          }}
          onDragEnd={() => {
            onDragEnd();
          }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default Sort;
