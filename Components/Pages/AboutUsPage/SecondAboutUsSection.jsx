// import React from "react";
// import Container from "@mui/material/Container";
// import styled from "@emotion/styled";
// import Typography from "@mui/material/Typography";
// import Image from "next/image";
// export default function SecondAboutUsSection({ data }) {
//   return (
//     <ContainerStyle maxWidth="xl">
//       <div className="grid">
//         <div className="history-wrapper">
//           <Typography variant="h5" component="p" className="history-title">
//             {data.content}
//           </Typography>
//         </div>
//         <div
//           className="image-wrapper"
//           style={{
//             paddingBottom: `${(data.image.height / data.image.width) * 100}%`,
//           }}
//         >
//           <Image src={data.image.url} alt={data.image.alt} fill />
//         </div>
//         <div className="stats-wrapper">
//           {data.statsArr.map((stat, index) => {
//             return (
//               <div key={index} className="stat">
//                 <Typography variant="h1" component="h3" className="stat-title">
//                   {stat.value}
//                 </Typography>
//                 <Typography variant="h5" component="p" className="stat-desc">
//                   {stat.label}
//                 </Typography>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </ContainerStyle>
//   );
// }

// const ContainerStyle = styled(Container)`
//   .grid {
//     padding: 80px 0;
//     display: grid;
//     grid-template-columns: 400px 1fr 400px;
//     gap: 40px;
//     @media (max-width: 600px) {
//       padding: 40px 0;
//     }
//     @media (max-width: 1480px) {
//       grid-template-columns: 300px 1fr 300px;
//     }
//     @media (max-width: 1100px) {
//       grid-template-columns: 1fr;
//       gap: 24px;
//     }
//   }
//   .history-wrapper {
//     display: flex;
//     align-items: center;
//     border-right: 1px solid var(--dark-outline-variant);
//     padding-right: 40px;
//     @media (max-width: 1100px) {
//       border-bottom: 1px solid var(--dark-outline-variant);
//       padding-bottom: 24px;
//       padding-right: 0;
//       border-right: none;
//     }
//   }
//   .image-wrapper {
//     position: relative;

//     img {
//       object-fit: cover;
//     }
//   }
//   .stats-wrapper {
//     border-left: 1px solid var(--dark-outline-variant);
//     padding-left: 40px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     @media (max-width: 1100px) {
//       border-top: 1px solid var(--dark-outline-variant);
//       padding-top: 24px;
//       padding-left: 0;
//       border-left: none;
//       flex-direction: row;
//       justify-content: flex-start;
//       gap: 40px;
//       flex-wrap: wrap;
//     }
//     .stat-title {
//       margin-top: 16px;
//     }
//   }
// `;
