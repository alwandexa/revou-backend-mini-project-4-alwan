import { ResultSetHeader } from "mysql2";
import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { CreateStudioRequest } from "../models/studio-model";

const StudioRepository = {
  createStudio: async (
    createStudioRequest: CreateStudioRequest,
    connection: PoolConnection
  ) => {
    const query = `INSERT INTO studios(name, capacity) VALUES('${createStudioRequest.name}', ${createStudioRequest.capacity})`;

    const result = await connection.query<ResultSetHeader>(query);

    return result[0].insertId;
  },
};

export { StudioRepository };
