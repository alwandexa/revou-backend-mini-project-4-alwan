import { ResultSetHeader } from "mysql2";
import { PoolConnection, RowDataPacket } from "mysql2/promise";

import {
  CreateStudioRequest,
  DeleteStudioRequest,
  GetAllStudiosResponse,
  UpdateStudioRequest,
} from "../models/studio-model";

const StudioRepository = {
  createStudio: async (
    createStudioRequest: CreateStudioRequest,
    connection: PoolConnection
  ) => {
    const query = `INSERT INTO studios(name, capacity) VALUES('${createStudioRequest.name}', ${createStudioRequest.capacity})`;

    const result = await connection.query<ResultSetHeader>(query);

    return result[0].insertId;
  },
  updateStudio: async (
    updateStudioRequest: UpdateStudioRequest,
    connection: PoolConnection
  ) => {
    const query = `UPDATE studios SET name = '${updateStudioRequest.name}', capacity = ${updateStudioRequest.capacity}, updated_at = now() WHERE studio_id = ${updateStudioRequest.studio_id}`;

    const result = await connection.query<ResultSetHeader>(query);

    if (result[0].affectedRows === 0) {
      throw new Error("Studio not found");
    }

    return result[0].affectedRows;
  },
  deleteStudio: async (
    deleteStudioRequest: DeleteStudioRequest,
    connection: PoolConnection
  ) => {
    const query = `UPDATE studios SET deleted_at = now() WHERE studio_id = ${deleteStudioRequest.studio_id}`;

    const result = await connection.query<ResultSetHeader>(query);

    if (result[0].affectedRows === 0) {
      throw new Error("Studio not found");
    }

    return result[0].affectedRows;
  },
  getAllStudios: async (connection: PoolConnection) => {
    const query = `SELECT studio_id, name, capacity FROM studios WHERE deleted_at IS NULL ORDER BY name ASC`;

    const [rows] = await connection.query<RowDataPacket[]>(query);

    const result: GetAllStudiosResponse[] = rows.map((value) => ({
      studio_id: value.studio_id,
      name: value.name,
      capacity: value.capacity,
    }));

    return result;
  },
  getStudioById: async (studioId: number, connection: PoolConnection) => {
    const query = `SELECT studio_id, name, capacity FROM studio WHERE studio_id = ${studioId}`;

    const [rows] = await connection.query<RowDataPacket[]>(query);

    if (rows.length === 0) {
      throw new Error("Studio not found");
    }

    return rows[0];
  },
};

export { StudioRepository };
