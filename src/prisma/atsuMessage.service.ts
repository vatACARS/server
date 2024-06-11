import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ATSUMessage, Prisma } from "@prisma/client";

@Injectable()
export class ATSUMessageService {
    constructor(private prisma: PrismaService) {}

    async ATSUMessage(ATSUMessageWhereUniqueInput: Prisma.ATSUMessageWhereUniqueInput): Promise<ATSUMessage | null> {
        return this.prisma.aTSUMessage.findUnique({ where: ATSUMessageWhereUniqueInput });
    }

    async ATSUMessageCollection(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ATSUMessageWhereUniqueInput;
        where?: Prisma.ATSUMessageWhereInput;
        orderBy?: Prisma.ATSUMessageOrderByWithRelationInput;
    }): Promise<ATSUMessage[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.aTSUMessage.findMany({
            skip, take, cursor, where, orderBy
        });
    }

    async createATSUMessage(data: Prisma.ATSUMessageCreateInput): Promise<ATSUMessage> {
        return this.prisma.aTSUMessage.create({ data });
    }

    async updateATSUMessage(params: {
        where: Prisma.ATSUMessageWhereUniqueInput;
        data: Prisma.ATSUMessageUpdateInput;
    }): Promise<ATSUMessage> {
        const { where, data } = params;
        return this.prisma.aTSUMessage.update({
            data, where
        });
    }

    async deleteATSUMessage(where: Prisma.ATSUMessageWhereUniqueInput): Promise<ATSUMessage> {
        return this.prisma.aTSUMessage.delete({ where });
    }
}