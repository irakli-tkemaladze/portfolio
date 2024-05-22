import firebase from "../firebase";

const projectDb = firebase.ref("/projects");

class CrudServiceForProjects {
  getAll() {
    return projectDb;
  }

  getOne(key){
    return projectDb.child(key)
  }

  create(project) {
    return projectDb.push(project);
  }

  update(key, value) {
    return projectDb.child(key).update(value);
  }

  delete(key) {
    return projectDb.child(key).remove();
  }

  deleteAll() {
    return projectDb.remove();
  }
}

export default new CrudServiceForProjects();