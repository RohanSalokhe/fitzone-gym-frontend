import React from "react";
import "./reports.css";

function Reports() {

  const monthlyData = [
    {
      month: "January",
      members: 45,
      payments: 32,
      revenue: 48000
    },
    {
      month: "February",
      members: 52,
      payments: 40,
      revenue: 56000
    },
    {
      month: "March",
      members: 61,
      payments: 48,
      revenue: 65000
    },
    {
      month: "April",
      members: 58,
      payments: 44,
      revenue: 62000
    },
    {
      month: "May",
      members: 72,
      payments: 55,
      revenue: 78000
    },
    {
      month: "June",
      members: 80,
      payments: 63,
      revenue: 89000
    }
  ];

  const totalMembers = monthlyData.reduce(
    (total, item) => total + item.members,
    0
  );

  const totalPayments = monthlyData.reduce(
    (total, item) => total + item.payments,
    0
  );

  const totalRevenue = monthlyData.reduce(
    (total, item) => total + item.revenue,
    0
  );


  return (

    <div className="reports-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="reports-header">

        <div>

          <h1>Reports</h1>

          <p>
            View gym performance and business reports
          </p>

        </div>

        <button className="download-report-btn">
          ↓ Download Report
        </button>

      </div>


      {/* =========================
          REPORT STATISTICS
      ========================= */}

      <div className="report-stats">

        <div className="report-stat-card">

          <div className="report-icon">
            👥
          </div>

          <div>

            <h3>
              {totalMembers}
            </h3>

            <p>Total Members</p>

            <span className="positive">
              +12.5%
            </span>

          </div>

        </div>


        <div className="report-stat-card">

          <div className="report-icon">
            💳
          </div>

          <div>

            <h3>
              {totalPayments}
            </h3>

            <p>Total Payments</p>

            <span className="positive">
              +8.4%
            </span>

          </div>

        </div>


        <div className="report-stat-card">

          <div className="report-icon">
            ₹
          </div>

          <div>

            <h3>
              ₹{totalRevenue.toLocaleString("en-IN")}
            </h3>

            <p>Total Revenue</p>

            <span className="positive">
              +15.8%
            </span>

          </div>

        </div>


        <div className="report-stat-card">

          <div className="report-icon">
            📈
          </div>

          <div>

            <h3>
              ₹{Math.round(
                totalRevenue / totalPayments
              ).toLocaleString("en-IN")}
            </h3>

            <p>Average Payment</p>

            <span className="positive">
              +6.2%
            </span>

          </div>

        </div>

      </div>


      {/* =========================
          MONTHLY REPORT
      ========================= */}

      <div className="report-table-container">

        <div className="report-table-header">

          <div>

            <h2>
              Monthly Performance
            </h2>

            <p>
              Members, payments and revenue overview
            </p>

          </div>

          <select className="report-filter">

            <option>
              2026
            </option>

            <option>
              2025
            </option>

            <option>
              2024
            </option>

          </select>

        </div>


        <div className="report-table-wrapper">

          <table>

            <thead>

              <tr>

                <th>
                  Month
                </th>

                <th>
                  New Members
                </th>

                <th>
                  Payments
                </th>

                <th>
                  Revenue
                </th>

                <th>
                  Growth
                </th>

              </tr>

            </thead>


            <tbody>

              {monthlyData.map(
                (item, index) => (

                  <tr key={index}>

                    <td>
                      <strong>
                        {item.month}
                      </strong>
                    </td>

                    <td>
                      {item.members}
                    </td>

                    <td>
                      {item.payments}
                    </td>

                    <td>
                      ₹{item.revenue.toLocaleString("en-IN")}
                    </td>

                    <td>

                      <span className="growth-badge">
                        +{index + 5}%
                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =========================
          QUICK REPORTS
      ========================= */}

      <div className="quick-reports">

        <h2>
          Quick Reports
        </h2>

        <div className="quick-report-grid">

          <div className="quick-report-card">

            <div className="quick-report-icon">
              👥
            </div>

            <div>

              <h3>
                Members Report
              </h3>

              <p>
                View complete member details
              </p>

            </div>

            <button>
              View →
            </button>

          </div>


          <div className="quick-report-card">

            <div className="quick-report-icon">
              💳
            </div>

            <div>

              <h3>
                Payment Report
              </h3>

              <p>
                View payment transactions
              </p>

            </div>

            <button>
              View →
            </button>

          </div>


          <div className="quick-report-card">

            <div className="quick-report-icon">
              📋
            </div>

            <div>

              <h3>
                Plans Report
              </h3>

              <p>
                View membership plan details
              </p>

            </div>

            <button>
              View →
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Reports;