import { useState, useEffect } from "react";

const useDraggable = (getAppList: any) => {
  // 应用列表
  const [list, setList] = useState<any[]>([]);
  // 当前拖拽对象
  const [oldDragItem, setOldDragItem] = useState<any>();
  // 拖拽交换对象
  const [newDragItem, setNewDragItem] = useState<any>();
  // 是否拖拽进行
  const [isEnter, setIsEnter] = useState<any>();
  // 是否拖拽
  const [isActive, setIsActive] = useState<any>();

  /* 拖拽开始 */
  const onDragStart = (value: any) => {
    // 拖拽对象
    setOldDragItem(value);
    // 拖拽状态
    setIsActive(value.id);
  };

  /* 拖拽进行 */
  const onDragEnter = (value: any) => {
    // 是否拖拽进行
    setIsEnter(value.id);
    // 拖拽交换对象
    setNewDragItem(value);
  };

  /* 拖拽结束 */
  const onDragEnd = () => {
    // 当前拖拽对象不等于
    if (oldDragItem !== newDragItem) {
      const oldIndex = list.indexOf(oldDragItem); //获取当前对象所在数组坐标
      const newIndex = list.indexOf(newDragItem); //获取当前目标对象所在数组坐标
      const newArray = [...list];
      newArray.splice(oldIndex, 1); //删除老节点
      newArray.splice(newIndex, 0, oldDragItem); //增加新节点
      setList(newArray); //保存拖拽后的数组
      setIsActive(-1); //重置状态
      setIsEnter(-1);
    }
  };

  useEffect(() => {
    document.addEventListener("dragover", function (event) {
      //阻止事件的默认行为
      event.preventDefault();
      //设置拖拽时鼠标样式
      event.dataTransfer.dropEffect = "move";
    });
    // 赋值列表
    setList(getAppList());
  }, [getAppList()]);

  return {
    oldDragItem,
    newDragItem,
    isActive,
    isEnter,
    list,
    onDragStart,
    onDragEnter,
    onDragEnd,
  };
};
export default useDraggable;
