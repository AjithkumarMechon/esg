import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Components/navbar/Navbar";
import LeftSection from "../Components/rating_model/left_section/LeftSection.jsx";
import RightSection from "../Components/rating_model/right_section/RightSection.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/rating_model.module.css";
import BottomNavbar from "../Components/rating_model/bottom_navbar/BottomNavbar";
import Loading from "../Components/loading/Loading";
import Cookies from "js-cookie";

export default function RatingModel() {
  const location = useLocation();
  const navigate = useNavigate();
  const responses = useRef({});
  const savedResponses = useRef(null);
  //console.log("Report Id", location.state.reportId);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [buttonType, setButtonType] = useState("inactive");
  const [isControversySelected, setIsControversySelected] = useState(false);

  useEffect(() => {
    if (!Cookies.get("esg_access_token") || !Cookies.get("esg_primary_user")) {
      navigate("/login");
      return;
    }
    // console.log(location.state.reportId);
    fetch(
      `${process.env.REACT_APP_API_URL}api/v1/preview?reportId=${location.state.reportId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("esg_access_token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          savedResponses.current = JSON.parse(
            JSON.stringify(data.responseBody)
          );
        }
        fetch(
          `${process.env.REACT_APP_API_URL}api/v1/esgModel?reportId=${location.state.reportId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: Cookies.get("esg_access_token"),
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            let catList = data.responseBody.categoryIndustryMapList;
            let themeList = catList[catList.length - 1].themeIndustryMaps;
            let keyIssueList =
              themeList[themeList.length - 1].keyIssueThemeMaps;
            let indicatorList =
              keyIssueList[keyIssueList.length - 1].indicatorKeyIssueMap;
            indicatorList.push({
              indicator: {
                id: 1,
                description: "*Does the company have any controversy?",
                code: "Controversy",
                unit: {
                  id: 1,
                  name: "DROPDOWN",
                  code: "Controversy",
                },
              },
            });

            responses.current.fnYear = data.responseBody.financialYear;
            responses.current.nicCode = data.responseBody.nicCode;
            responses.current.companyName = data.responseBody.companyName;
            responses.current.reportId = Number(location.state.reportId);
            responses.current.version = data.responseBody.version;
            responses.current.quarter = data.responseBody.quarter;
            responses.current.clientId = data.responseBody.clientId;
            if (
              savedResponses.current &&
              savedResponses.current.isEnvCompleted !== undefined
            ) {
              responses.isEnvCompleted = savedResponses.current.isEnvCompleted;
            } else {
              responses.isEnvCompleted = false;
            }
            if (
              savedResponses.current &&
              savedResponses.current.isSocialCompleted !== undefined
            ) {
              responses.isSocialCompleted =
                savedResponses.current.isSocialCompleted;
            } else {
              responses.isSocialCompleted = false;
            }
            if (
              savedResponses.current &&
              savedResponses.current.isGoveranceCompleted !== undefined
            ) {
              responses.isGoveranceCompleted =
                savedResponses.current.isGoveranceCompleted;
            } else {
              responses.isGoveranceCompleted = false;
            }
            responses.current.categoryList = [];

            data.responseBody.categoryIndustryMapList.forEach((category) => {
              let categoryObj = {};
              categoryObj.id = category.category.id;
              categoryObj.name = category.category.name;
              categoryObj.code = category.category.code;
              categoryObj.themeList = [];

              category.themeIndustryMaps.forEach((theme) => {
                let themeObj = {};
                themeObj.id = theme.theme.id;
                themeObj.name = theme.theme.name;
                themeObj.keyIssueList = [];

                theme.keyIssueThemeMaps.forEach((keyIssue) => {
                  let keyIssueObj = {};
                  keyIssueObj.id = keyIssue.keyIssue.id;
                  keyIssueObj.name = keyIssue.keyIssue.name;
                  keyIssueObj.indicatorList = [];

                  keyIssue.indicatorKeyIssueMap.forEach((indicator) => {
                    let indicatorObj = {};
                    indicatorObj.id = indicator?.indicator?.id;
                    indicatorObj.description =
                      indicator?.indicator?.description;
                    indicatorObj.code = indicator?.indicator?.code;
                    indicatorObj.unit = indicator?.indicator?.unit?.code;
                    indicatorObj.response = getSavedResponse(
                      indicator?.indicator?.code
                    ).response;
                    indicatorObj.comment = getSavedResponse(
                      indicator?.indicator?.code
                    ).comment;

                    keyIssueObj.indicatorList.push(indicatorObj);
                  });

                  themeObj.keyIssueList.push(keyIssueObj);
                });

                categoryObj.themeList.push(themeObj);
              });

              responses.current.categoryList.push(categoryObj);
            });

            //console.log(responses.current);
            checkResponses();

            setData(data);
            setLoading(false);
          });
      });
  }, [location.state.reportId, navigate]);

  if (loading) {
    return <Loading />;
  }

  function checkResponses() {
    let flag = false;
    responses.current.categoryList.forEach((category) => {
      let flag2 = true;
      category.themeList.forEach((theme) => {
        theme.keyIssueList.forEach((keyIssue) => {
          keyIssue.indicatorList.forEach((indicator) => {
            if ([null, "", "Select", undefined].includes(indicator.response)) {
              flag2 = false;
            }
            if (indicator.code === "Controversy") {
              if (
                [null, "", "Select", undefined].includes(indicator.response)
              ) {
                setIsControversySelected(false);
              } else {
                setIsControversySelected(true);
              }
            }
          });
        });
      });
      if (category.name === "Environment") {
        responses.current.isEnvCompleted = flag2;
      } else if (category.name === "Social") {
        responses.current.isSocialCompleted = flag2;
      } else if (category.name === "Corporate Governance") {
        responses.current.isGoveranceCompleted = flag2;
      }
      if (!flag) {
        flag = flag2;
      }
    });
    if (flag) {
      setButtonType("active");
    } else {
      setButtonType("inactive");
    }
    // console.log(JSON.stringify(responses.current));
    // console.log(flag);
    return flag;
  }

  function getSavedResponse(code) {
    let comment = "";
    let response = null;
    if (savedResponses.current) {
      savedResponses.current.categoryList.forEach((category) => {
        category.themeList.forEach((theme) => {
          theme.keyIssueList.forEach((keyIssue) => {
            keyIssue.indicatorList.forEach((indicator) => {
              if (indicator.code === code) {
                response = indicator.response;
                comment = indicator.comment;
              }
            });
          });
        });
      });
    }
    return { response, comment };
  }

  function getResponse(code) {
    let comment = "";
    let response = "";
    responses.current.categoryList.forEach((category) => {
      category.themeList.forEach((theme) => {
        theme.keyIssueList.forEach((keyIssue) => {
          keyIssue.indicatorList.forEach((indicator) => {
            if (indicator.code === code) {
              response = indicator.response;
              comment = indicator.comment;
            }
          });
        });
      });
    });
    return { response, comment };
  }

  function setResponse(code, response) {
    responses.current.categoryList.forEach((category) => {
      category.themeList.forEach((theme) => {
        theme.keyIssueList.forEach((keyIssue) => {
          keyIssue.indicatorList.forEach((indicator) => {
            if (indicator.code === code) {
              //console.log(indicator);
              indicator.response = response;
            }
          });
        });
      });
    });
    checkResponses();
  }

  function setComment(code, comment) {
    responses.current.categoryList.forEach((category) => {
      category.themeList.forEach((theme) => {
        theme.keyIssueList.forEach((keyIssue) => {
          keyIssue.indicatorList.forEach((indicator) => {
            if (indicator.code === code) {
              indicator.comment = comment;
            }
          });
        });
      });
    });
  }

  const handleSaveDraft = () => {
    //console.log(JSON.stringify(responses.current))
    let sendingResponses = JSON.parse(JSON.stringify(responses.current));

    sendingResponses.categoryList.forEach((category) => {
      category.themeList.forEach((theme) => {
        theme.keyIssueList.forEach((keyIssue) => {
          keyIssue.indicatorList = keyIssue.indicatorList.filter(
            (indicator) =>
              ![null, "", "Select", undefined].includes(indicator.response)
          );
        });
      });
    });

    fetch(process.env.REACT_APP_API_URL + "api/v1/save-draft-ESGModel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("esg_access_token"),
      },
      body: JSON.stringify(sendingResponses),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/esgInformation", {
          state: {
            clientId: data.responseBody.clientId,
            companyName: data.responseBody.companyName,
          },
        });
      });
  };

  const handleGenerateScore = () => {
    if (!isControversySelected) {
      const el = document.getElementById("controversy-indicator");
      el.style.border = "0.0625rem solid #F91D0A";
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    let sendingResponses = JSON.parse(JSON.stringify(responses.current));

    sendingResponses.categoryList.forEach((category) => {
      category.themeList.forEach((theme) => {
        theme.keyIssueList.forEach((keyIssue) => {
          keyIssue.indicatorList = keyIssue.indicatorList.filter(
            (indicator) =>
              ![null, "", "Select", undefined].includes(indicator.response)
          );
        });
      });
    });

    // console.log(JSON.stringify(sendingResponses));

    fetch(process.env.REACT_APP_API_URL + "api/v1/esgScore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("esg_access_token"),
      },
      body: JSON.stringify(sendingResponses),
    })
      .then((res) => res.json())
      .then((d) => {
        navigate("/generateScore", {
          state: {
            d,
            financialYear: responses.current.fnYear,
            quarter: responses.current.quarter,
            industryType: data.responseBody.industryType,
          },
        });
      });
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.grid_container}>
        <LeftSection
          categoryIndustryMapList={data.responseBody.categoryIndustryMapList}
        />
        <RightSection
          data={data.responseBody}
          getResponse={getResponse}
          setResponse={setResponse}
          setComment={setComment}
        />
      </div>
      <BottomNavbar
        buttonType={buttonType}
        handleGenerateScore={handleGenerateScore}
        handleSaveDraft={handleSaveDraft}
      />
    </div>
  );
}
