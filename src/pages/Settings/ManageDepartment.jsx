import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { ModalStatus } from '@/constants/common';
import PageTable from '@/components/PageTable';
import { IModal } from 'ii-admin-ui';
import { DepartmentFilterCfg, DepartmentStatusList } from './config/department';
import DepartmentModal from './DepartmentModal';

import styles from './ManageDepartment.less';

const ManageDepartment = props => {
  const [modalStatus, setModalStatus] = useState(ModalStatus.Hide);
  const [itemInfo, setItemInfo] = useState({});
  const [filterCfgList, setFilterCfgList] = useState(DepartmentFilterCfg);
  const [operaType, setOperaType] = useState('delete');
  const [needRefresh, setNeedFresh] = useState(false);

  const {
    manageDepartment,
    getTableList,
    createItem,
    enableItem,
    resetItem,
    deleteItem,
    updateItem,
    createLoading,
    userInfo,
  } = props;
  const { total = 0, tableList = [] } = manageDepartment;

  const hideModal = () => {
    setModalStatus(ModalStatus.Hide);
  };

  // 新增条目操作
  const createItemOpera = () => {
    setModalStatus(ModalStatus.Create);
    setItemInfo({});
  };

  // 编辑条目操作
  const editItemOpera = record => {
    setModalStatus(ModalStatus.Edit);
    setItemInfo(record);
  };

  // 删除条目操作
  const deleteItemOpera = () => {
    setNeedFresh(false);

    deleteItem(itemInfo.departmentId).then(() => {
      setModalStatus(ModalStatus.Hide);
      setNeedFresh(true);
    });
  };

  // 启用/禁用条目操作
  const enableItemOpera = id => {
    setNeedFresh(false);

    enableItem(id).then(() => {
      setModalStatus(ModalStatus.Hide);
      setNeedFresh(true);
    });
  };

  // 重置密码
  const resetItemOpera = () => {
    setNeedFresh(false);

    resetItem(itemInfo.userId).then(() => {
      setModalStatus(ModalStatus.Hide);
      setNeedFresh(true);
    });
  };

  const handleAcitons = (type, record) => {
    setModalStatus(ModalStatus.Delete);
    setOperaType(type);
    setItemInfo(record);
  };

  const MODAL_CFG = {
    reset: {
      title: '重置密码',
      btnOkText: '重置',
      content: '密码重置置后默认为123456。请确认，是否重置？',
      onOk: resetItemOpera,
    },
    delete: {
      title: '删除',
      btnOkText: '删除',
      content: '删除后，将账户将不可找回。请确认，是否继续删除？',
      onOk: deleteItemOpera,
    },
  };

  const columns = [
    {
      title: '部门名称',
      key: 'departmentName',
      width: 193,
    },
    {
      title: '部门类型',
      key: 'departmentType',
      width: 130,
      render: text => (text === 0 ? '科室' : '村社'),
    },
    {
      title: '项目负责人',
      key: 'petitionManager',
      width: 130,
    },
    {
      title: '手机号',
      key: 'phone',
      width: 138,
    },
    {
      title: '部门账号',
      key: 'username',
      width: 162,
    },
    {
      title: '关联角色',
      key: 'roleType',
      width: 160,
      render: text => (text === 0 ? '项目工作员' : '项目办理员'),
    },
    {
      title: '状态',
      key: 'status',
      width: 90,
      render: text => {
        const item = DepartmentStatusList[text];

        if (item) {
          return (
            <span
              className={styles.pageTag}
              style={{
                backgroundColor: `${item.bg}`,
                color: `${item.color}`,
              }}
            >
              {item.name}
            </span>
          );
        } else {
          return null;
        }
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 220,
      render: (text, record) => {
        return record.departmentId !== userInfo.departmentId ? (
          <div className={styles.pageTableAction}>
            {record.status === 0 ? (
              <a onClick={() => enableItemOpera(record.userId)}>启用</a>
            ) : (
              <a onClick={() => enableItemOpera(record.userId)}>禁用</a>
            )}
            <a onClick={() => editItemOpera(record)}>编辑</a>
            <a onClick={() => handleAcitons('reset', record)}>重置密码</a>
            <a onClick={() => handleAcitons('delete', record)}>删除</a>
          </div>
        ) : null;
      },
    },
  ];

  return (
    <PageTable
      total={total}
      pageTitle="部门管理"
      uniqueKey="departmentId"
      tableList={tableList}
      getTableList={getTableList}
      columns={columns}
      filters={filterCfgList}
      showCreate={true}
      createTitle="新增部门"
      createCallback={createItemOpera}
      needRefresh={needRefresh}
    >
      <IModal
        onCancel={hideModal}
        visible={modalStatus === ModalStatus.Delete}
        btnOkText={MODAL_CFG[operaType].btnOkText}
        title={MODAL_CFG[operaType].title}
        onOk={MODAL_CFG[operaType].onOk}
      >
        <div>{MODAL_CFG[operaType].content}</div>
      </IModal>

      <DepartmentModal
        status={modalStatus}
        hideModal={hideModal}
        selectedItem={itemInfo}
        createItem={createItem}
        updateItem={updateItem}
        loading={createLoading}
        setItemInfo={setItemInfo}
      />
    </PageTable>
  );
};

const mapStateToProps = state => {
  const { manageDepartment = {}, loading, login } = state;

  return {
    userInfo: login.userInfo || {},
    manageDepartment,
    createLoading: loading.effects['manageDepartment/createItem'],
  };
};

const mapDispatchToProps = dispatch => {
  const namespace = 'manageDepartment';

  return {
    getTableList: ({ pageNum, pageSize, ...restParams }) => {
      dispatch({
        type: `${namespace}/queryTableList`,
        payload: { current: pageNum, size: pageSize, ...restParams },
      });
    },
    enableItem: id =>
      dispatch({ type: `${namespace}/enableItem`, payload: id }),
    resetItem: id => dispatch({ type: `${namespace}/resetItem`, payload: id }),
    createItem: params =>
      dispatch({ type: `${namespace}/createItem`, payload: params }),
    deleteItem: id =>
      dispatch({ type: `${namespace}/deleteItem`, payload: id }),
    updateItem: params =>
      dispatch({ type: `${namespace}/updateItem`, payload: params }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDepartment);
