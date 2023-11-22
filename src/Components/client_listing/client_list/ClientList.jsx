import React from "react";
import styles from "./client_list.module.css";
import ClientListHeader from "./client_list_header/ClientListHeader";
import ClientListItem from "./client_list_item/ClientListItem";
import ClientListFooter from "./client_list_footer/ClientListFooter";
import NoData from "../../no_data/NoData";

export default function ClientList({
  data,
  pageNo,
  setPageNo,
  companyIds,
  setCompanyIds,
  sortFilter,
  setSortFilter,
}) {
  return (
    <div className={styles.client_list}>
      <ClientListHeader
        companyIds={companyIds}
        setCompanyIds={setCompanyIds}
        sortFilter={sortFilter}
        setSortFilter={setSortFilter}
      />
      <div className={styles.client_list_items_div}>
        {data.clientList.content.length > 0 ? (
          data.clientList.content.map((data, idx) => {
            return (
              <ClientListItem
                key={idx}
                data={data}
                background={
                  idx % 2 ? { background: "#FFF" } : { background: "#FCFBFC" }
                }
              />
            );
          })
        ) : (
          <NoData />
        )}
      </div>
      <ClientListFooter
        totalElements={data?.clientList?.totalElements}
        totalPages={data?.clientList?.totalPages || 0}
        pageNo={pageNo}
        setPageNo={setPageNo}
      />
    </div>
  );
}
