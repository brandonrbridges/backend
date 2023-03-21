import { Controller, Get, Param, Post, Query } from '@nestjs/common';

import { InvitationDocument } from './invitation.schema';
import { InvitationsService } from './invitations.service';

@Controller('invitations')
export class InvitationsController {
  constructor(private invitationsService: InvitationsService) {}

  @Get()
  findAll(@Query() query): Promise<InvitationDocument[]> {
    if (query) {
      return this.invitationsService.findAll(query);
    }

    return this.invitationsService.findAll();
  }

  @Get(':id')
  findById(@Param() params): Promise<InvitationDocument> {
    return this.invitationsService.findById(params.id);
  }

  @Post()
  insertOne(): Promise<InvitationDocument> {
    return;
  }
}
