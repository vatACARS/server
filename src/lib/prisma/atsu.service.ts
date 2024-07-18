import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ATSUInformation, Prisma } from "@prisma/client";

@Injectable()
export class ATSUService {
    constructor(private prisma: PrismaService) {}

    async ATSUInformation(ATSUInformationWhereUniqueInput: Prisma.ATSUInformationWhereUniqueInput): Promise<ATSUInformation | null> {
        return this.prisma.aTSUInformation.findUnique({
            where: ATSUInformationWhereUniqueInput
        });
    }

    async ATSUInformationCollection(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ATSUInformationWhereUniqueInput;
        where?: Prisma.ATSUInformationWhereInput;
        orderBy?: Prisma.ATSUInformationOrderByWithRelationInput;
    }): Promise<ATSUInformation[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.aTSUInformation.findMany({
            skip, take, cursor, where, orderBy
        });
    }

    async createATSUInformation(data: Prisma.ATSUInformationCreateInput): Promise<ATSUInformation> {
        return this.prisma.aTSUInformation.create({ data });
    }

    async updateATSUInformation(params: {
        where: Prisma.ATSUInformationWhereUniqueInput;
        data: Prisma.ATSUInformationUpdateInput;
    }): Promise<ATSUInformation> {
        const { where, data } = params;
        return this.prisma.aTSUInformation.update({
            data, where
        });
    }

    async deleteATSUInformation(where: Prisma.ATSUInformationWhereUniqueInput): Promise<ATSUInformation> {
        return this.prisma.aTSUInformation.delete({ where });
    }
}