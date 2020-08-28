import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { ModalStatus } from '@/constants/common';
import PageTable from '@/components/PageTable';
import { IModal } from 'ii-admin-ui';
import { UserFilterCfg, UserStatusList } from './config/account';
import AccountModal from './AccountModal';

import styles from './ManageAccount.less';

const ManageAccount = props => {
  const [modalStatus, setModalStatus] = useState(ModalStatus.Hide);
  const [itemInfo, setItemInfo] = useState({});
  const [needRefresh, setNeedFresh] = useState(false);

  const {
    manageAccount,
    getTableList,
    enableItem,
    createItem,
    updateItem,
    deleteItem,
    createLoading,
    getDepartmentList,
    userInfo,
  } = props;

  const { total = 0, tableList = [], departmentList = [] } = manageAccount;

  useEffect(() => {
    getDepartmentList();
  }, []);

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

  // 启用/禁用条目操作
  const enableItemOpera = id => {
    setNeedFresh(false);

    enableItem(id).then(() => {
      setModalStatus(ModalStatus.Hide);
      setNeedFresh(true);
    });
  };

  // 删除条目操作
  const deleteItemOpera = () => {
    setNeedFresh(false);

    deleteItem(itemInfo.id).then(() => {
      setModalStatus(ModalStatus.Hide);
      setNeedFresh(true);
    });
  };

  const handleAcitons = (type, record) => {
    setModalStatus(ModalStatus.Delete);
    setItemInfo(record);
  };

  const columns = [
    {
      title: '姓名',
      key: 'name',
      width: 316,
    },
    {
      title: '联系方式',
      key: 'phone',
      width: 450,
    },
    {
      title: '所属县级',
      key: 'countyName',
      width: 200,
    },
    {
      title: '短信通知',
      key: 'smsFlag',
      width: 100,
      render: text => {
        const item = UserStatusList[text];

        if (item) {
          return (
            <span className={styles.pageTag} style={{ color: `${item.color}` }}>
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
      width: 158,
      render: (text, record) => (
        <div className={styles.pageTableAction}>
          {record.name === 'admin' ? null : (
            <>
              {record.smsFlag === 0 ? (
                <a onClick={() => enableItemOpera(record.id)}>启用</a>
              ) : (
                <a onClick={() => enableItemOpera(record.id)}>禁用</a>
              )}
              <a onClick={() => editItemOpera(record)}>编辑</a>
              <a onClick={() => handleAcitons('delete', record)}>删除</a>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <PageTable
      total={total}
      pageTitle="人员管理"
      uniqueKey="id"
      tableList={tableList}
      getTableList={params =>
        getTableList({
          ...params,
          departmentId: userInfo.roleType === 0 ? '' : userInfo.departmentId,
        })
      }
      columns={columns}
      filters={UserFilterCfg}
      showCreate={true}
      createTitle="新增人员"
      createCallback={createItemOpera}
      needRefresh={needRefresh}
    >
      <IModal
        onCancel={hideModal}
        visible={modalStatus === ModalStatus.Delete}
        title="删除"
        onOk={deleteItemOpera}
      >
        <div>删除后，该人员将不可找回。请确认，是否继续删除？</div>
      </IModal>

      <AccountModal
        status={modalStatus}
        hideModal={hideModal}
        selectedItem={itemInfo}
        createItem={createItem}
        updateItem={updateItem}
        loading={createLoading}
        setItemInfo={setItemInfo}
        filterOpts={departmentList}
      />
    </PageTable>
  );
};

const mapStateToProps = state => {
  const { manageAccount = {}, loading, login } = state;

  return {
    manageAccount,
    userInfo: login.userInfo || {},
    createLoading: loading.effects['manageAccount/createItem'],
  };
};

const mapDispatchToProps = dispatch => {
  const namespace = 'manageAccount';

  return {
    getTableList: ({ pageNum, pageSize, ...restParams }) =>
      dispatch({
        type: `${namespace}/queryTableList`,
        payload: { current: pageNum, size: pageSize, ...restParams },
      }),
    getDepartmentList: () =>
      dispatch({ type: `${namespace}/queryDepartmentList` }),
    enableItem: userCode =>
      dispatch({ type: `${namespace}/enableItem`, payload: userCode }),
    createItem: params =>
      dispatch({ type: `${namespace}/createItem`, payload: params }),
    deleteItem: userCode =>
      dispatch({ type: `${namespace}/deleteItem`, payload: userCode }),
    updateItem: params =>
      dispatch({ type: `${namespace}/updateItem`, payload: params }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
