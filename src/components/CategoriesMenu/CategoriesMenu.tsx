import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/configStore";
import JobModel, {
  DsChiTietLoai,
  DsNhomChiTietLoai,
} from "../../redux/models/JobModel";
import { getMenuLoaiCv } from "../../redux/reducers/jobReducer";

type Props = {};

export default function CategoriesMenu({}: Props) {
  const { arrLoaiCV } = useSelector((state: RootState) => state.jobReducer);
  console.log(arrLoaiCV);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const actionApi = getMenuLoaiCv();
    dispatch(actionApi);
  }, []);

  //
  //   const renderMenuLoaiCV = () => {
  //     return arrLoaiCV.map((job: JobModel, index: number) => {
  //       return (
  //         <li className="categoriesmenu_li" key={index}>
  //           <a href="#">{job.tenLoaiCongViec}</a>
  //         </li>
  //       );
  //     });
  //   };

  //   const renderJobDetial = () => {
  //     return job.map(())
  //   }

  return (
    // <section className="CategoriesMenu">
    //   <div className="categoriesmenu_wrapper">
    //     <nav className="categoriesmenu_row container">
    //       <ul className="categoriesmenu_ul ">{renderMenuLoaiCV()}</ul>
    //     </nav>
    //   </div>
    // </section>
    <section className="CategoriesMenu">
      <div className="categoriesmenu_wrapper">
        <nav className="categoriesmenu_row">
          <ul className="categoriesmenu_ul ">
            {arrLoaiCV.map((job: JobModel, index: number) => {
              return (
                <li className="categoriesmenu_li" key={index}>
                  <a className="links" href="#">
                    {job.tenLoaiCongViec}
                  </a>
                  <ul className="categoriesmenu_li_jobdetail">
                    {job.dsNhomChiTietLoai?.map(
                      (detail: DsNhomChiTietLoai, index: number) => {
                        return (
                          <div className="container-fluid" key={index}>
                            <h1 className="categoriesmenu_li_jobdetail_detail">
                              {detail.tenNhom}
                            </h1>
                            {detail.dsChiTietLoai?.map(
                              (job: DsChiTietLoai, index: number) => {
                                return (
                                  <a
                                    className="categoriesmenu_li_jobdetail_detail_job"
                                    href="#"
                                    key={index}
                                  >
                                    {job.tenChiTiet}
                                  </a>
                                );
                              }
                            )}
                          </div>
                        );
                      }
                    )}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
