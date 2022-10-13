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
  //
  const { arrLoaiCV } = useSelector((state: RootState) => state.jobReducer);
  console.log(arrLoaiCV);
  const dispatch: AppDispatch = useDispatch();

  //
  useEffect(() => {
    const actionApi = getMenuLoaiCv();
    dispatch(actionApi);
  }, []);

  return (
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
                  <ul
                    className={`categoriesmenu_li_jobdetail categoriesmenu_li_jobdetail_${job.id}`}
                  >
                    {/* <ul className="categoriesmenu_li_jobdetail"> */}
                    {job.dsNhomChiTietLoai?.map(
                      (detail: DsNhomChiTietLoai, index: number) => {
                        return (
                          <div className="container-fluid mb-3" key={index}>
                            <p className="categoriesmenu_li_jobdetail_detail">
                              {detail.tenNhom}
                            </p>
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
