import React, { useState } from "react";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";

const Index = (props) => {
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    console.log(props.pageData);
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
  };

  return (
    <div>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={props.pageData.limit}
        totalItemsCount={props.pageData.total}
        pageRangeDisplayed={5}
        onChange={handlePageChange.bind()}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pageData: state.newsReducer.pagination,
  };
};

export default connect(mapStateToProps)(Index);
