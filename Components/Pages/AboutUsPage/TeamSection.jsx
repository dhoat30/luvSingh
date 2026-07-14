import Container from "@mui/material/Container";
import React from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import LocationCircleIcon from "@/Components/UI/Icons/LocationCircleIcon";
import styles from './AboutUsPage.module.scss'
export default function TeamSection({ data }) {
  return (
    <section className={`${styles.teamSection}`}> 
      <Container maxWidth="xl">
        <div className={`${styles.titleWrapper}`}>
          <Typography variant="h1" component="h2" className="title">
            {data.title}
          </Typography>
          <Typography variant="body1" component="p" className="subtitle">
            {data.description}
          </Typography>
        </div>
        <div className={styles.teamMembersWrapper}>
          <div className={styles.teamMembers}>
            {data.teamMembersArr.map((member, index) => {
              return (
                <div key={index} className={styles.teamMember}>
                  <div className={styles.teamMemberImage}>
                    <Image className={styles.image} src={member.image.url} alt={member.name} fill />
                  </div>
                  <div className={styles.teamMemberInfo}>
                    <Typography
                      variant="h6"
                      component="div"
                      className="team-member-name"
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      className="team-member-role"
                    >
                      {member.position}
                    </Typography>
                    <div className={styles.teamMemberLocation}>
                      <LocationCircleIcon />
                      <Typography variant="body1" component="span">
                        {member.location}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
