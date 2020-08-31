import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { ColumnProps } from 'antd/lib/table';
import { IModal } from 'ii-admin-ui';
import { ConnectState } from '@/models/connect';
import { ModalStatus } from '@/constants/common';
import PageTable from '@/components/PageTable';
import { UserFilterCfg, UserStatusList } from './config/user';
import { IUserListItem } from '@/services/user';
import UserModal from './UserModal';

import styles from './ManageUser.less';

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const ManageUser: React.FC<Props> = props => {
  const [modalStatus, setModalStatus] = useState(ModalStatus.Hide);
  const [itemInfo, setItemInfo] = useState<Partial<IUserListItem>>({});
  const [needRefresh, setNeedFresh] = useState(false);

  const {
    manageUser,
    getTableList,
    enableItem,
    createItem,
    updateItem,
    deleteItem,
    createLoading,
    getDepartmentList,
    userInfo,
  } = props;

  const { total = 0, tableList = [], departmentList = [] } = manageUser;

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
  const editItemOpera = (record: IUserListItem) => {
    setModalStatus(ModalStatus.Edit);
    setItemInfo(record);
  };

  // 启用/禁用条目操作
  const enableItemOpera = (id: number) => {
    setNeedFresh(false);

    enableItem(id).then(() => {
      setModalStatus(ModalStatus.Hide);
      setNeedFresh(true);
    });
  };

  // 删除条目操作
  const deleteItemOpera = () => {
    setNeedFresh(false);

    deleteItem(itemInfo.id as number).then(() => {
      setModalStatus(ModalStatus.Hide);
      setNeedFresh(true);
    });
  };

  const handleAcitons = (type, record: IUserListItem) => {
    setModalStatus(ModalStatus.Delete);
    setItemInfo(record);
  };

  const columns: Array<ColumnProps<IUserListItem>> = [
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
      key: 'county',
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
          {record.smsFlag === 0 ? (
            <a onClick={() => enableItemOpera(record.id)}>启用</a>
          ) : (
            <a onClick={() => enableItemOpera(record.id)}>禁用</a>
          )}
          <a onClick={() => editItemOpera(record)}>编辑</a>
          <a onClick={() => handleAcitons('delete', record)}>删除</a>
        </div>
      ),
    },
  ];

  return (
    <PageTable
      total={total}
      pageTitle="用户管理"
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
      createTitle="新增用户"
      createCallback={createItemOpera}
      needRefresh={needRefresh}
    >
      <IModal
        onCancel={hideModal}
        visible={modalStatus === ModalStatus.Delete}
        title="删除"
        onOk={deleteItemOpera}
      >
        <div>删除后，该用户将不可找回。请确认，是否继续删除？</div>
      </IModal>

      <UserModal
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

const mapStateToProps = (state: ConnectState) => {
  const { manageUser, loading, login } = state;

  return {
    manageUser,
    userInfo: login.userInfo || {},
    createLoading: loading.effects['manageUser/createItem'],
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const namespace = 'manageUser';

  return {
    getTableList: ({ pageNum, pageSize, ...restParams }) =>
      dispatch({
        type: `${namespace}/queryTableList`,
        payload: { current: pageNum, size: pageSize, ...restParams },
      }),
    createItem: params =>
      dispatch({ type: `${namespace}/createItem`, payload: params }),
    updateItem: params =>
      dispatch({ type: `${namespace}/updateItem`, payload: params }),
    deleteItem: (id: number) =>
      dispatch({ type: `${namespace}/deleteItem`, payload: id }),
    getDepartmentList: () =>
      dispatch({ type: `${namespace}/queryDepartmentList` }),
    enableItem: (id: number) =>
      dispatch({ type: `${namespace}/enableItem`, payload: id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
