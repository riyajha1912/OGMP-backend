let subjects;
let Subject = [];

export default class SubjectDAO {
  static async injectDB(conn) {
    if (subjects) {
      return;
    }
    try {
      subjects = await conn.db(process.env.ADMIN_NS).collection("UserData");
    } catch (e) {
      console.error(
        `unable to establish connection to queryDAO(Subjects): ${e}`
      );
    }
  }

  static async getSubject() {
    try {
      Subject = await subjects.distinct("Dept");
      return Subject;
    } catch (e) {
      console.error(`Unable to get Subjects: ${e}`);
      return Subject;
    }
  }

  // static async addSubject(subject, queryID) {
  //   if (Subject.includes(subject)) {
  //     return Subject;
  //   } else {
  //     try {
  //       const subjectDoc = {
  //         Subject: subject,
  //         _id: ObjectID(queryID),
  //       };
  //       return await subjects.insertOne(subjectDoc);
  //     } catch (e) {
  //       console.error(`Unable to post Query ${e}`);
  //       return { error: e };
  //     }
  //   }
  // }
}
