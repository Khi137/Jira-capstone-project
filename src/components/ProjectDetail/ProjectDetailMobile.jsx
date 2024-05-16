import React, { useState } from "react";
import VirtualList from "rc-virtual-list";
import { NavLink, useParams } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Drawer,
  message,
  Select,
  Form,
  ConfigProvider,
  Input,
  InputNumber,
  Slider,
  Avatar,
  Popover,
  Divider,
  Tooltip,
  Modal,
  Row,
  Col,
  List,
  Space,
  Collapse,
  Popconfirm,
} from "antd";
import { commentService, projectService } from "../../service/service";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  AntDesignOutlined,
  BugOutlined,
  DeleteOutlined,
  HistoryOutlined,
  PlusOutlined,
  RocketOutlined,
  SearchOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
// const onChange = (e) => {
//   console.log("Change:", e.target.value);
// };
const { Option } = Select;

const data = [
  "Racing car ",
  "Japanese princess ",
  "Australian",
  "Man charged .",
  "Los Angeles ",
  "Australian.",
  "Man charged ",
  "Los Angeles .",
];

const ContainerHeight = 250;
export default function ProjectDetailMobile() {
  const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
  const [selectedItems, setSelectedItems] = useState([]);

  const [taskData, setTaskData] = useState({});
  console.log("task data", taskData);

  const [taskId, setTaskId] = useState(0);
  const [commentTemp, setCommentTemp] = useState("");
  const [descriptionTemp, setDescriptionTemp] = useState("");
  const [statusIdTemp, setStatusIdTemp] = useState("");
  const [estimateTemp, setEstimateTemp] = useState();
  const [timeTrackingTemp, setTimeTrackingTemp] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  // console.log("time tracking",timeTrackingTemp)
  //assignee for ant select multi
  const [assigneeTemp, setAssigneeTemp] = useState(
    taskData?.assigness?.map((member) => {
      return {
        key: member.id,
        label: member.name,
        value: member.id,
      };
    }) || []
  );
  console.log("assignee temp", assigneeTemp);
  const [nameTemp, setNameTemp] = useState("");
  const [taskTypeIdTemp, setTaskTypeIdTemp] = useState(0);
  const [assigneePutTemp, setAssigneePutTemp] = useState([]);
  const [taskPriorityTemp, setTaskPriorityTemp] = useState();
  const [commentEdit, setCommentEdit] = useState("");
  const [commentId, setCommentId] = useState(0);
  console.log("coment id", commentId);
  console.log("commentEdit:", commentEdit);

  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };
  // modal thêm user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    //form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // const handleChangeTaskEdit = (value) => {
  //   console.log(`selected ${value}`);
  // };
  //modal task update
  const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);

  const showModalTask = (id) => {
    console.log("task id click", id);
    projectService
      .getTaskDetail(id)
      .then((result) => {
        setTaskData(result.data.content);

        //Task info
        setNameTemp(result.data.content.taskName);
        setTaskTypeIdTemp(result.data.content.typeId);
        const assigneeList = result.data.content.assigness.map((item) => {
          return item.id;
        });
        // console.log("assignee list",assigneeList)
        setAssigneePutTemp(assigneeList);
        setTaskId(result.data.content.taskId);

        // setDescriptionTemp(result.data.content.description);
        // setStatusIdTemp(result.data.content.statusId);
        // setEstimateTemp(result.data.content.originalEstimate);
        // const newTimeTracking = {
        //   timeTrackingSpent: result.data.content.timeTrackingSpent,
        //   timeTrackingRemaining: result.data.content.timeTrackingRemaining,
        // };
        // setTimeTrackingTemp(newTimeTracking);
        // setTaskPriorityTemp(result.data.content.priorityId);

        //assignee form for ant render
        const map1 = result.data.content.assigness.map((member) => {
          return {
            key: member.id,
            label: member.name,
            value: member.id,
          };
        });
        setAssigneeTemp(map1);
      })
      .then(()=>{
        setIsModalTaskOpen(true);
      })
      .catch((err) => {
        console.log("err task detail", err);
      });

    // setTimeout(() => {
    //   console.log("Delayed for 0.5 second.");
    //   setIsModalTaskOpen(true);
    // }, "200");
  };
  useEffect(() => form.resetFields(), [assigneeTemp]);
  const handleCancelTask = () => {
    setIsModalTaskOpen(false);
    setTaskData({});
  };

  const [form] = Form.useForm();
  let userJson = localStorage.getItem("USER");
  let USER = JSON.parse(userJson);
  console.log("USER", USER);
  let { projectDataRedux } = useSelector((state) => state.projectReducer);
  if (projectDataRedux == false) {
    projectDataRedux = [];
  }
  let usersRedux = useSelector((state) => state.usersManageReducer.usersRedux);
  // console.log("users redux", usersRedux);
  const projectDataReduxById = projectDataRedux.filter(
    (item) => item.creator.id == USER.id
  );

  //console.log("projectDataReduxById", projectDataReduxById);
  const [taskPriority, setTaskPriority] = useState();
  //console.log("task priority state", taskPriority);
  const [taskStatus, setTaskStatus] = useState();
  const [taskType, setTaskType] = useState();
  //console.log("task type", taskType);
  const [open, setOpen] = useState(false);
  const [productSelected, setProductSelected] = useState();
  //console.log("pick product", productSelected);
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    const productSelected = projectDataReduxById.find(
      (item) => item.id == value
    );
    setProductSelected(productSelected);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [totalTime, setTotalTime] = useState(0);
  const onChangeTotalTime = (newValue) => {
    setTotalTime(newValue);
  };
  const [spentTime, setSpentTime] = useState(0);
  const onChangeSpentTime = (newValue) => {
    setSpentTime(newValue);
  };
  //task priority
  useEffect(() => {
    projectService
      .getTaskPriority()
      .then((result) => {
        //console.log("project service",result.data.content)
        setTaskPriority(result.data.content);
      })
      .catch((err) => {});
  }, []);
  //task status
  useEffect(() => {
    projectService
      .getTaskStatus()
      .then((result) => {
        setTaskStatus(result.data.content);
      })
      .catch((err) => {});
  }, []);
  //task type
  useEffect(() => {
    projectService
      .getTaskType()
      .then((result) => {
        setTaskType(result.data.content);
      })
      .catch((err) => {});
  }, []);
  const onFinish = (values) => {
    const data = { ...values, timeTrackingRemaining: totalTime - spentTime };
    console.log("Success:", data);

    projectService
      .createTask(data)
      .then((result) => {
        message.success("Success");
        console.log("dk thanh cong", result);
        form.resetFields();
        setOpen(false);
      })
      .catch((err) => {
        message.error("Error");
        console.log("dk thanh cong", err);
      });
    setRandomNumber(Math.random());
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.lstTaskDeTail];
      // item đang chọn

      const destItems = [...destColumn.lstTaskDeTail];
      //destColumn.lstTaskDeTail item của collum đang chọn
      //console.log("destColumn.lstTaskDeTail",destColumn.lstTaskDeTail)
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          lstTaskDeTail: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          lstTaskDeTail: destItems,
        },
      });

      // console.log("remove",removed)
      // console.log("status id ", destination.droppableId);
      let data = {
        taskId: removed.taskId,
        statusId: destination.droppableId * 1 + 1,
      };
      // console.log("data", data);
      projectService
        .updateStatus(data)
        .then((result) => {
          message.success("Update Task Successfully!");
          setRandomNumber(Math.random());
        })
        .catch((err) => {
          message.error("Error");
        });

      //console.log("sourceItems",sourceItems)
      //console.log("drop end ",destItems)
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.lstTaskDeTail];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          lstTaskDeTail: copiedItems,
        },
      });
      // console.log("drop end same column");
      setRandomNumber(Math.random());
    }
  };
  const onAddUserOfProject = (UserId) => {
    const item = { projectId: projectDetail.id, userId: UserId };
    projectService
      .addUserFromProject(item)
      .then((result) => {
        message.success("user added");
      })
      .catch((err) => {
        message.error("error");
      });
    setRandomNumber(Math.random());
    SetSearchInput("");
  };
  const onDeleteUserOfProject = (UserId) => {
    // console.log("delete id", UserId);
    // console.log("project id", projectDetail.id);
    const item = { projectId: projectDetail.id, userId: UserId };
    // console.log("item", item);
    projectService
      .removeUserFromProject(item)
      .then((result) => {
        message.success("User deleted");
        //console.log("dk thanh cong", result);
      })
      .catch((err) => {
        message.error("Error");
        // console.log("dk thanh cong", err);
      });
    setRandomNumber(Math.random());
  };

  //console.log("random number", randomNumber);
  //lấy tên project
  let { id } = useParams();
  //const [columns, setColumns] = useState(taskStatus);
  // if(projectDetail!==false){
  //   const columns = projectDetail.lstTask
  // }

  // console.log("columns",columns)

  const [columns, setColumns] = useState(false);
  // console.log("🚀 ~ file: ProjectDetail.jsx:87 ~ columns:", columns);

  const [randomNumber, setRandomNumber] = useState("11");
  const [projectDetail, setProjectDetail] = useState(false);
  console.log(
    "🚀 ~ file: ProjectDetail.jsx:84 ~ projectDetail:",
    projectDetail
  );
  // lấy data project detail
  useEffect(() => {
    // console.log("lay projectdetail lan dau");
    projectService
      .getProjectDetail(id)
      .then((result) => {
        // console.log("project detail", result.data.content);
        setProjectDetail(result.data.content);
        setColumns(result.data.content.lstTask);
      })

      .catch((err) => {});
  }, []);
  // lấy data project detail khi cập nhật status
  useEffect(() => {
    projectService
      .getProjectDetail(id)
      .then((result) => {
        // console.log("project detail", result.data.content);
        setProjectDetail(result.data.content);
        setColumns(result.data.content.lstTask);
        // console.log("lay data luc update status");
      })
      .catch((err) => {});
  }, [randomNumber]);

  let usersFilter = [];
  if (usersRedux && projectDetail) {
    usersFilter = usersRedux?.filter(
      (item1) =>
        !projectDetail.members.some((item2) => item2.userId === item1.userId)
    );
    // console.log("users Filter", usersFilter);
  }
  const [searchInput, SetSearchInput] = useState("");
  // console.log("🚀 ~ file: ProjectDetail.jsx:299 ~ searchInput:", searchInput);

  const FilteredData = () => {
    return usersFilter.filter((user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  //edit task

  const onChangeStatus = (value) => {
    // console.log("status",value)
    setStatusIdTemp(String(value));
    const data = {
      taskId: taskData.taskId,
      statusId: String(value),
    };
    // console.log("data status",data)
    projectService
      .updateStatus(data)
      .then((result) => {
        message.success("Success");
      })
      .catch((err) => {
        message.error("Error");
      });
  };

  const onChangeComment = (e) => {
    console.log("Change:", e.target.value);
    setCommentTemp(e.target.value);
  };
  const onSubmitComment = () => {
    console.log("comment click");
    const data = {
      taskId: taskData.taskId,
      contentComment: commentTemp,
    };
    setTaskId(taskData.taskId);
    console.log("data", data);
    commentService
      .insertComment(data)
      .then((result) => {
        message.success("Success");
        setCommentTemp("");
      })
      .catch((err) => {
        message.error("Error");
      });
    setRandomNumber(Math.random());
  };

  const onChangeDescription = (e) => {
    console.log("Change:", e.target.value);
    setDescriptionTemp(e.target.value);
  };
  const onSubmitDescription = () => {
    const data = {
      taskId: taskData.taskId,
      description: descriptionTemp,
    };
    console.log("data", data);
    projectService
      .updateDescription(data)
      .then((result) => {
        message.success("Success");
      })
      .catch((err) => {
        message.error("Are you an assignee of this task?");
      });
    setRandomNumber(Math.random());
  };

  //change and submit
  const onChangePriority = (value) => {
    // console.log("status",value)
    const data = {
      taskId: taskData.taskId,
      priorityId: value,
    };
    console.log("data priority", data);
    projectService
      .updatePriority(data)
      .then((result) => {
        message.success("Success");
      })
      .catch((err) => {
        message.error("Are you an assignee of this task?");
      });
  };

  const onChangeEstimate = (value) => {
    console.log("Change:", value);
    setEstimateTemp(value);
  };
  const onSubmitEstimate = () => {
    console.log("comment click");
    const data = {
      taskId: taskData.taskId,
      originalEstimate: estimateTemp,
    };
    console.log("data", data);
    projectService
      .updateEstimate(data)
      .then((result) => {
        message.success("Success");
      })
      .catch((err) => {
        message.error("Are you an assignee of this task?");
      });

    setRandomNumber(Math.random());
  };

  const onChangeSpent = (value) => {
    console.log("Change:", value);
    setTimeTrackingTemp({ ...timeTrackingTemp, timeTrackingSpent: value });
  };
  const onChangeRemaining = (value) => {
    console.log("Change:", value);
    setTimeTrackingTemp({ ...timeTrackingTemp, timeTrackingRemaining: value });
  };
  const onSubmitTracking = () => {
    console.log("comment click");
    const data = { ...timeTrackingTemp, taskId: taskData.taskId };
    console.log("data", data);
    projectService
      .updateTimeTracking(data)
      .then((result) => {
        message.success("Success");
      })
      .catch((err) => {
        message.error("Are you an assignee of this task?");
      });
    setRandomNumber(Math.random());
  };

  //update task
  const onChangeTaskName = (e) => {
    console.log("Change:", e.target.value);
    setNameTemp(e.target.value);
  };
  const onChangeTaskTypeId = (value) => {
    console.log("typeId", value);
    setTaskTypeIdTemp(value);
  };
  const onChangeAssignees = (value) => {
    console.log("assignee", value);
    // const newData = projectDetail.members.filter((item) =>
    //   value.includes(item.userId)
    // );
    setAssigneePutTemp(value);
  };
  const onUpdateTask = () => {
    // const data = {
    //   listUserAsign: assigneePutTemp,
    //   taskId: taskId,
    //   taskName: nameTemp,

    //   description: descriptionTemp,
    //   statusId: statusIdTemp,
    //   originalEstimate: estimateTemp,
    //   timeTrackingSpent: timeTrackingTemp.timeTrackingSpent,
    //   timeTrackingRemaining: timeTrackingTemp.timeTrackingRemaining,
    //   projectId: projectDetail.id,
    //   typeId: taskTypeIdTemp,
    //   priorityId: taskPriorityTemp,
    // };
    const dataAddAssignee = { ...taskData, listUserAsign: assigneePutTemp };
    const dataAddTaskId = { ...dataAddAssignee, taskId: taskId };
    const data = { ...dataAddTaskId, taskName: nameTemp };
    console.log("data update", data);
    projectService
      .updateTask(data)
      .then((result) => {
        message.success("Updated");
        setRandomNumber(Math.random());
      })
      .catch((err) => {
        message.error("Error");
      });
  };
  const onRemoveTask = () => {
    console.log("taskid", taskData.taskId);
    projectService
      .removeTask(taskData.taskId)
      .then((result) => {
        message.success("xoá thành công");
        setIsModalTaskOpen(false);
        setRandomNumber(Math.random());
      })
      .catch((err) => {});
  };

  const onDeleteComment = (id) => {
    console.log("comment id", id);
    commentService
      .deleteComment(id)
      .then((result) => {
        message.success("xoá thành công");
        setRandomNumber(Math.random());
      })
      .catch((err) => {});
  };

  const onEditComment = (data) => {
    console.log("comment data", data);
    setCommentEdit(data.commentContent);
    setCommentId(data.id);
  };
  const handleEditComment = (e) => {
    console.log("edit comment", e.target.value);
    setCommentEdit(e.target.value);
  };

  const onUpdateComment = () => {
    commentService
      .updateComment(commentId, commentEdit)
      .then((result) => {
        message.success("Success");
        setRandomNumber(Math.random());
      })
      .catch((err) => {
        message.error("Error");
      });
  };
  const contentComment = (
    <div>
      <Input defaultValue={commentEdit} onChange={handleEditComment}></Input>
      <Button
        size="small"
        className="mt-1 "
        type="text"
        onClick={onUpdateComment}
      >
        <SendOutlined />
      </Button>
    </div>
  );

  useEffect(() => {
    projectService
      .getTaskDetail(taskId)
      .then((result) => {
        setTaskData(result.data.content);
        console.log("lay task detail khi cap nhat");
      })
      .catch((err) => {
        console.log("err task detail", err);
      });
  }, [randomNumber]);

  return (
    <div>
      <Breadcrumb
        className="mb-3"
        items={[
          {
            title: <NavLink to="/">Projects Management</NavLink>,
          },
          {
            title: projectDetail?.projectName,
          },
        ]}
      />
      <div>
        <div className=" ">
          {USER.id == projectDetail?.creator?.id && (
            <Button
              type="text"
              className="mr-10  btnAddTask ml-3"
              style={{ backgroundColor: "#001529", color: "white" }}
              onClick={() => {
                showDrawer();
              }}
            >
              Create Task
            </Button>
          )}
          <div className="">
            <p className="font-semibold pt-1 pr-2">Members:</p>{" "}
          </div>

          <Avatar.Group
            maxCount={3}
            maxPopoverTrigger="click"
            size="medium"
            maxStyle={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
              cursor: "pointer",
            }}
          >
            {projectDetail?.members?.map((item, index) => {
              return (
                <Tooltip title={item.name} placement="top">
                  <Avatar
                    key={index}
                    style={{
                      backgroundColor: "#dddddd",
                      color: "#AE8EBB",
                    }}
                  >
                    {item.name.slice(0, 2).toUpperCase()}
                  </Avatar>
                </Tooltip>
              );
            })}
          </Avatar.Group>
          {USER.id == projectDetail?.creator?.id && (
            <Tooltip title="Add member" placement="top">
              <Button
                type="text"
                className="btnBlue"
                shape="circle"
                onClick={showModal}
                icon={<PlusOutlined />}
              ></Button>
            </Tooltip>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            height: "100%",
            paddingTop: "20px",
          }}
        >
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns)?.map(([columnId, column], index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={columnId}
                >
                  <div>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: "#e4e8f1",
                              padding: 4,
                              width: 180,
                              minHeight: 100,
                              borderRadius: "6px",
                              marginBottom: "10px",
                            }}
                            className="shadow-md hover:shadow-2xl"
                          >
                            <h2
                              style={{
                                margin: "5px 5px 8px 5px",
                                fontWeight: "600",
                                fontSize: ".65rem",
                                lineHeight: "1rem",
                                padding: "0.125rem 0.5rem 0.125rem 0.5rem",
                                borderRadius: "4px",
                              }}
                              className={column.statusName}
                            >
                              {column.statusName}
                            </h2>
                            {/* {column.items.map((item, index) => { */}
                            {column.lstTaskDeTail?.map((item, index) => {
                              return (
                                <Draggable
                                  key={String(item.taskId)}
                                  draggableId={String(item.taskId)}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 7,
                                          margin: "5px 5px 8px 5px",
                                          minHeight: "50px",
                                          backgroundColor: "#ffffff",
                                          color: "white",
                                          ...provided.draggableProps.style,
                                          borderRadius: "4px",

                                          color: "black",
                                        }}
                                        className="shadow-md"
                                      >
                                        <div
                                          className=""
                                          onClick={() =>
                                            showModalTask(item.taskId)
                                          }
                                        >
                                          <div className="flex justify-between items-center ">
                                            <div className="iconBlue text-sm">
                                              {item.taskName}
                                            </div>
                                            <div className=" mr-2 h-5">
                                              {item.taskTypeDetail.taskType ==
                                              "bug" ? (
                                                <Tooltip
                                                  title="Bug"
                                                  placement="top"
                                                >
                                                  <BugOutlined className="iconBrown" />
                                                </Tooltip>
                                              ) : (
                                                <Tooltip
                                                  title="New Task"
                                                  placement="top"
                                                >
                                                  <RocketOutlined className="iconBrown" />
                                                </Tooltip>
                                              )}
                                            </div>
                                          </div>

                                          <div className="flex justify-between items-center pt-2 ">
                                            <span
                                              className={
                                                item.priorityTask.priority
                                              }
                                            >
                                              {item.priorityTask.priority}
                                            </span>
                                            <div className="ant-col ant-col-6 ">
                                              <Avatar.Group
                                                maxCount={2}
                                                maxPopoverTrigger="click"
                                                size="small"
                                                maxStyle={{
                                                  color: "#f56a00",
                                                  backgroundColor: "#fde3cf",
                                                  cursor: "pointer",
                                                }}
                                              >
                                                {item.assigness?.map(
                                                  (item1, index) => {
                                                    return (
                                                      <Tooltip
                                                        title={item1.alias}
                                                        placement="top"
                                                      >
                                                        <Avatar
                                                          key={index}
                                                          style={{
                                                            backgroundColor:
                                                              "#dddddd",
                                                            color: "#AE8EBB",
                                                          }}
                                                        >
                                                          {item1.alias
                                                            .slice(0, 2)
                                                            .toUpperCase()}
                                                        </Avatar>
                                                      </Tooltip>
                                                    );
                                                  }
                                                )}
                                              </Avatar.Group>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>

      <Drawer
        title="Create Task"
        placement="right"
        onClose={onClose}
        open={open}
        size="medium"
      >
        <ConfigProvider
          theme={{
            //     token:{
            // margin:10
            //     },
            components: {
              Form: {
                itemMarginBottom: 20,
                verticalLabelPadding: 1,
              },
            },
          }}
        >
          <Form
            form={form}
            name="basic"
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
              projectId: projectDetail.id,
              priorityId: 1,
              statusId: "1",
              typeId: 1,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Project"
              name="projectId"

              // help="* You can only create tasks of your own projects!"
            >
              <Select
                onChange={handleChange}
                // defaultValue={{
                //   value: projectDetail.projectName,
                // }}
                disabled
              >
                {/* {projectDataReduxById?.map((project, index) => { */}

                <Option value={projectDetail.id} s key={projectDetail.id}>
                  {projectDetail.projectName}
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Task name"
              name="taskName"
              rules={[
                {
                  required: true,
                  message: "Please input your task name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Status" name="statusId">
              <Select
              // defaultValue={{
              //   value: taskStatus ? taskStatus[0].statusName : "",
              // }}
              >
                {taskStatus?.map((item, index) => {
                  return (
                    <Option value={item.statusId} key={index}>
                      {item.statusName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Priority"
              name="priorityId"
              rules={[]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}
            >
              <Select
              // defaultValue={{
              //   value: taskPriority ? taskPriority[0].priority : "",
              // }}
              >
                {taskPriority?.map((item, index) => {
                  return (
                    <Option value={item.priorityId} key={index}>
                      {item.priority}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Task Type"
              name="typeId"
              rules={[]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            >
              <Select
                defaultValue={{
                  value: taskType ? taskType[0].taskType : "",
                }}
              >
                {taskType?.map((item, index) => {
                  return (
                    <Option
                      value={item.id}
                      //value={parseInt(item.TypeId)}
                      key={index}
                    >
                      {item.taskType}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Assigners"
              name="listUserAsign"
              rules={[
                {
                  required: true,
                  message: "Please add assigner!",
                },
              ]}
            >
              <Select mode="multiple" placeholder="Please select Assigners">
                {projectDetail?.members?.map((member, index) => {
                  return (
                    <Option value={member.userId} key={index}>
                      {member.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <p>Time tracker</p>
            <Form.Item
              name="originalEstimate"
              label="Estimated Hours"
              rules={[
                {
                  required: true,
                  message: "Please input Total Estimated Hours!",
                  type: "number",
                  min: 0,
                  max: 99,
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}
            >
              <InputNumber value={totalTime} onChange={onChangeTotalTime} />
            </Form.Item>
            <Form.Item
              name="timeTrackingSpent"
              label="Hours spent"
              rules={[
                {
                  required: true,
                  message: "Please input Hours spent!",
                  type: "number",
                  // min: 0,
                  // max:3,
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}
            >
              <InputNumber
                value={spentTime}
                onChange={onChangeSpentTime}
                min={0}
                max={totalTime}
              />
            </Form.Item>

            <Form.Item label="Slider" name="timeTrackingRemaining">
              <Slider
                min={0}
                max={totalTime}
                onChange={onChangeTotalTime}
                value={typeof spentTime === "number" ? spentTime : 0}
              />
              <span className="flex justify-between font-medium">
                <p>{spentTime} hour(s)spent</p>
                <p>{totalTime - spentTime} hour(s)remaining</p>
              </span>
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input description!",
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#1890ff" }}
                className=" btnBlue"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Drawer>
      <Modal
        title="Add members to project"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
        width={600}
      >
        {/* <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p> */}
        <Divider />
        <Row>
          <Col span={20} className="pb-3 pl-3">
            <Space.Compact size="small">
              <Input
                addonAfter={<SearchOutlined />}
                placeholder="Search users"
                value={searchInput}
                onChange={(e) => SetSearchInput(e.target.value)}
              />
            </Space.Compact>
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            <h5 className="font-medium pb-2 pl-3">Not yet added</h5>
            <List size="small">
              <VirtualList
                data={FilteredData()}
                height={ContainerHeight}
                itemHeight={30}
                itemKey="assigner"
                onScroll={onScroll}
              >
                {(item) => (
                  <List.Item>
                    <List.Item.Meta
                      // avatar={
                      //   <Avatar
                      //     style={{
                      //       backgroundColor: "#dddddd",
                      //     }}
                      //   >
                      //     {item.name.slice(0, 2).toUpperCase()}
                      //   </Avatar>
                      // }
                      title={<a href="https://ant.design">{item.name}</a>}
                      description={<p>User ID: {item.userId}</p>}
                    />

                    <Button
                      className="btnBlue"
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={() => onAddUserOfProject(item.userId)}
                    ></Button>
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </Col>
          <Col span={11} offset={2}>
            {" "}
            <h5 className="font-medium pb-2 pl-3">Already in project</h5>
            <List size="small">
              <VirtualList
                data={projectDetail.members}
                height={ContainerHeight}
                itemHeight={20}
                itemKey="assigner"
                onScroll={onScroll}
              >
                {(item) => (
                  <List.Item>
                    <List.Item.Meta
                      // avatar={
                      //   <Avatar
                      //     style={{
                      //       backgroundColor: "#dddddd",
                      //     }}
                      //   >
                      //     {item.name.slice(0, 2).toUpperCase()}
                      //   </Avatar>
                      // }
                      title={<a href="https://ant.design">{item.name}</a>}
                      description={<p>User ID: {item.userId}</p>}
                    />

                    <Button
                      type="text"
                      className="btnRed"
                      icon={<DeleteOutlined />}
                      onClick={() => onDeleteUserOfProject(item.userId)}
                    ></Button>
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </Col>
        </Row>
      </Modal>
      <Modal
        destroyOnClose={true}
        // afterClose={() => form.resetFields()}
        // title="Task update"
        // title={

        // }
        open={isModalTaskOpen}
        onCancel={handleCancelTask}
        footer={[]}
        width={800}
      >
        <Row>
        {USER.id == projectDetail?.creator?.id && (
              <Popconfirm
                placement="bottomLeft"
                title="Delete the task"
                description="Are you sure to remove this task?"
                okText="Yes"
                cancelText="No"
                onConfirm={onRemoveTask}
              >
                <Button
                  type="text"
                  className="btnRemove"
                  // onClick={onRemoveTask}
                  style={{  marginBottom: "10px" }}
                >
                  Remove Task
                </Button>
              </Popconfirm>
            )}
          <Select
            onChange={onChangeStatus}
            style={{ width: "250px" }}
            defaultValue={{
              value: taskData.statusId,
            }}
          >
            {taskStatus?.map((item, index) => {
              return (
                <Option value={item.statusId} key={index}>
                  {item.statusName}
                </Option>
              );
            })}
          </Select>
          <Collapse
            className="mt-2 w-full"
            size="small"
            items={[
              {
                key: "1",
                label: "Task Info",
                children: (
                  <div>
                    <Divider orientation="left" style={{fontSize:"14px"}}>Task Name</Divider>
                    <Input
                      // addonBefore="Name"
                      onChange={onChangeTaskName}
                      defaultValue={taskData.taskName}
                    />

                    <Row className="justify-between pt-2 ">
                      <p className="ml-2">Type</p>{" "}
                      <Select
                        defaultValue={{
                          value: taskData?.taskTypeDetail?.id,
                          label: taskData?.taskTypeDetail?.taskType,
                        }}
                        style={{
                          width: 100,
                          marginLeft: "15px",
                        }}
                        onChange={onChangeTaskTypeId}
                        options={[
                          {
                            value: 2,
                            label: "new task",
                          },
                          {
                            value: 1,
                            label: "bug",
                          },
                        ]}
                      />
                    </Row>
                    <Row className="justify-between pt-2">
                      {" "}
                      <p className="ml-2"> Assignees</p>{" "}
                      <Select
                        defaultValue={assigneeTemp}
                        style={{
                          width: 200,
                        }}
                        mode="multiple"
                        placeholder="Please select Assigners"
                        onChange={onChangeAssignees}
                      >
                        {projectDetail?.members?.map((member, index) => {
                          return (
                            <Option value={member.userId} key={index}>
                              {member.name}
                            </Option>
                          );
                        })}
                      </Select>
                    </Row>
                    {USER.id == projectDetail?.creator?.id && (
                      <Button
                        type="text"
                        className="mt-2 btnBlue"
                        size="small"
                        onClick={onUpdateTask}
                      >
                        Update
                      </Button>
                    )}
                  </div>
                ),
              },
            ]}
          />
          <Collapse
            className="mt-2 w-full"
            size="small"
            items={[
              {
                key: "1",
                label: "Details",
                children: (
                  <div>
                    <Row className="justify-between">
                      {" "}
                      <p className="pt-1">Priority</p>{" "}
                      <Select
                        style={{ width: "100px" }}
                        defaultValue={{
                          value: taskData.priorityId,
                        }}
                        onChange={onChangePriority}
                      >
                        {taskPriority?.map((item, index) => {
                          return (
                            <Option value={item.priorityId} key={index}>
                              {item.priority}
                            </Option>
                          );
                        })}
                      </Select>
                    </Row>

                    <br />
                    <Row className="justify-between">
                      <p className="pt-1">Estimate Time</p>
                      <div>
                        <InputNumber
                          addonBefore={<HistoryOutlined />}
                          prefix="min"
                          defaultValue={taskData.originalEstimate}
                          style={{ width: "120px" }}
                          onChange={onChangeEstimate}
                        />
                        <Button
                          type="text"
                          className="ml-1 btnBlue"
                          size="small"
                          onClick={onSubmitEstimate}
                        >
                          Save
                        </Button>
                      </div>
                    </Row>
                    <br />

                    {/* <p>Time tracking</p> */}
                    <Divider orientation="left"> Time Tracking</Divider>

                    <Row className="justify-between">
                      <p>Time Spent</p>
                      <p>Time Remaining</p>
                    </Row>
                    <Row className="justify-between">
                      <InputNumber
                        style={{
                          width: "115px",
                        }}
                        addonBefore={<HistoryOutlined />}
                        prefix="min"
                        defaultValue={taskData.timeTrackingSpent}
                        onChange={onChangeSpent}
                      />

                      <InputNumber
                        style={{
                          width: "115px",
                        }}
                        addonBefore={<HistoryOutlined />}
                        prefix="min"
                        defaultValue={taskData.timeTrackingRemaining}
                        onChange={onChangeRemaining}
                      />
                    </Row>
                    <Button
                      type="text"
                      className="mt-2 btnBlue"
                      size="small"
                      onClick={onSubmitTracking}
                    >
                      Save
                    </Button>
                  </div>
                ),
              },
            ]}
          />
          <Divider orientation="left" style={{fontSize:"14px"}}>Description</Divider>

          <TextArea
            // showCount
            maxLength={100}
            rows={1}
            onChange={onChangeDescription}
            placeholder="input..."
            defaultValue={taskData.description}
          />
          <div className="w-full">
            {USER.id == projectDetail?.creator?.id && (
              <Button
                type="text"
                size="small"
                style={{ marginTop: "5px" }}
                onClick={onSubmitDescription}
                className="btnBlue"
              >
                Save
              </Button>
            )}
          </div>
          <div className="w-full">
            <Divider orientation="left" style={{fontSize:"14px"}}>Comment</Divider>
            <Row>
              <Col>
                <Avatar
                  src={
                    <img
                      src={`https://ui-avatars.com/api/?name=${USER.name}`}
                      alt="avatar"
                    />
                  }
                  style={{ marginRight: "12px" }}
                ></Avatar>
              </Col>
              <Col span={18}>
                <TextArea
                  showCount
                  maxLength={100}
                  onChange={onChangeComment}
                  placeholder="Please leave a comment here"
                  value={commentTemp}
                />
              </Col>
            </Row>

            <Button
              type="text"
              size="small"
              style={{ marginTop: "5px" }}
              onClick={onSubmitComment}
              className="btnBlue"
            >
              Add Comment
            </Button>
            <div
              className="comment-lists"
              style={{
                overflow: "scroll",
                height: "180px",
                overflowX: "hidden",
              }}
            >
              {taskData?.lstComment?.map((item) => {
                return (
                  <div className="comment" key={item.id}>
                    <div className="comment-inner">
                      <Avatar
                        src={
                          <img
                            src={`https://ui-avatars.com/api/?name=${item.name}`}
                            alt="avatar"
                          />
                        }
                        style={{ marginRight: "12px" }}
                      ></Avatar>

                      <div className="comment-content">
                        <div className="ant-comment-content-author">
                          <span className="ant-comment-content-author-name">
                            <span className="iconBrown text-xs">
                              {item.name}
                            </span>
                          </span>
                        </div>
                        <div className="ant-comment-content-detail">
                          <div>
                            <div className="text-sm pb-1">
                              {item.commentContent}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: 10,
                              }}
                            >
                              <Popover
                                placement="topLeft"
                                content={contentComment}
                                title="Edit Comment"
                                trigger="click"
                              >
                                <Button
                                  type="text"
                                  size="small"
                                  className="button-resize btnEdit"
                                  onClick={() => onEditComment(item)}
                                >
                                  Edit
                                </Button>
                              </Popover>
                              <Popconfirm
                                title="Delete the comment"
                                description="Are you sure to delete this comment?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => onDeleteComment(item.id)}
                              >
                                <Button
                                  size="small"
                                  className="button-resize btnRemove"
                                  type="text"
                                >
                                  Delete
                                </Button>
                              </Popconfirm>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
     
         
        </Row>
      </Modal>
    </div>
  );
}
