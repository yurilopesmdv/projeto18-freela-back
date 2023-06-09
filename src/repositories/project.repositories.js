import {db} from "../connection/database.connection.js"

export function getAllProjectsQuery() {
    return db.query(`SELECT * FROM projects;`)
}

export function postProjectQuery(projectId, classId, projectUrl, userId) {
    return db.query(`
        INSERT INTO deliveries (projectid, classid, projecturl, userid) VALUES ($1, $2, $3, $4)
    ;`, [projectId, classId, projectUrl, userId])
}

export function getAllDeliveriesQuery() {
    return db.query(`
        SELECT d.id, p.id AS "projectId", p.projectname, d.classid, d.projecturl, d.grade, u.id AS "studentId", u.name AS "studentName", u.picture
            FROM deliveries d
            JOIN users u ON u.id = d.userid
            JOIN projects p ON p.id = d.projectid
    ;`)
}

export function getDelieverieByIdQuery(id) {
    return db.query(`
        SELECT d.id, p.id AS "projectId", p.projectname, d.classid, d.projecturl, d.grade, u.id AS "studentId", u.name AS "studentName", u.picture, u.email
            FROM deliveries d
            JOIN users u ON u.id = d.userid
            JOIN projects p ON p.id = d.projectid
            WHERE d.id=$1
    ;`, [id])
}

export function updateDeliverieQuery(id, grade) {
    return db.query(`
        UPDATE deliveries
            SET grade=$2
            WHERE id=$1
    ;`, [id, grade])
}