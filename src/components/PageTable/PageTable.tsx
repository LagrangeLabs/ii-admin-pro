import React, { useState, useEffect, FC } from 'react';
import { Table, Button, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FilterOptions from './FilterOptions';
import { IPageTableProps } from './interface';
import { ITable } from 'ii-admin-ui';

import styles from './index.less';

const PageTable: FC<IPageTableProps> = props => {
  const {
    total,
    tableList,
    uniqueKey,
    getTableList,
    children,
    pageTitle,
    columns,
    filters = [],
    showRowSelection = false,
    exportFile,
    showCreate,
    showExtra,
    createTitle,
    createCallback,
    exportCallback,
    needExport,
    needSelect,
    extraCallback,
    defaultCondtions = {},
    needRefresh,
    scroll,
  } = props;

  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchConditons, setSearchConditions] = useState(defaultCondtions);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    refreshTableList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, pageSize, searchConditons]);

  useEffect(() => {
    if (needRefresh) {
      refreshTableList();
    }
  }, [needRefresh]);

  const refreshTableList = () => {
    getTableList({
      pageNum,
      pageSize,
      ...searchConditons,
    });
  };

  const changePageNumAndSize = ({ num = pageNum, size = pageSize }) => {
    setPageNum(num);
    setPageSize(size);
  };

  const nColumns = columns.map(item => ({
    dataIndex: item.key,
    ...item,
  }));

  const handleSearchConditions = data => {
    setPageNum(1);
    setPageSize(10);
    setSearchConditions({ ...searchConditons, ...data });
  };

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, child => {
      return React.cloneElement(child, {
        refreshList: refreshTableList,
      });
    });

    return childrenComponent;
  };

  const onSelectChange = selectRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectRowKeys);
  };

  const rowSelection =
    needExport && needSelect
      ? {
          selectedRowKeys,
          onChange: onSelectChange,
        }
      : undefined;

  const handleExport = () => {
    if (needSelect) {
      if (selectedRowKeys.length === 0) {
        message.error('请先选择要导出的数据');
        return;
      } else {
        exportCallback && exportCallback(selectedRowKeys);
      }
    } else {
      exportCallback && exportCallback(searchConditons);
    }
  };

  const handleCreate = () => {
    createCallback(searchConditons);
  };

  return (
    <PageHeaderWrapper>
      <div className={styles.pageTable}>
        <h3 className={styles.pageTitle}>{pageTitle}</h3>
        <div className={styles.pageFilters}>
          <div className={styles.filters}>
            <FilterOptions
              defaultCondtions={defaultCondtions}
              filters={filters}
              setFilterOpts={handleSearchConditions}
            />
          </div>

          {needExport ? (
            <Button
              className={styles.plus}
              onClick={handleExport}
              style={{ marginRight: '10px' }}
            >
              导出
            </Button>
          ) : null}

          {showCreate ? (
            <Button
              type="primary"
              className={styles.plus}
              onClick={handleCreate}
            >
              {createTitle}
            </Button>
          ) : null}
        </div>

        <ITable
          bordered
          rowKey={record => record[`${uniqueKey}`]}
          columns={nColumns}
          dataSource={tableList}
          rowSelection={rowSelection}
          // scroll={{ x: 1132 }}
          scroll={scroll ? scroll : { x: 1132 }}
          pagination={{
            total,
            showSizeChanger: false,
            pageSize: pageSize,
            current: pageNum,
            onChange: (page, pageSize) =>
              changePageNumAndSize({ num: page, size: pageSize }),
          }}
        />
        {renderChildren()}
      </div>
    </PageHeaderWrapper>
  );
};

PageTable.defaultProps = {
  filters: [],
  showCreate: false,
  needRefresh: false,
  needExport: false,
  needSelect: true,
  uniqueKey: 'id',
};

export default PageTable;
