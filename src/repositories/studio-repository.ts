import { ResultSetHeader } from "mysql2";
import { PoolConnection, RowDataPacket } from "mysql2/promise";

import {
  CreateStudioRequest,
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
};

export { StudioRepository };
