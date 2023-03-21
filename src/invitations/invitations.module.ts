import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Invitations Dependencies
import { InvitationSchema } from './invitation.schema';
import { InvitationsController } from './invitations.controller';
import { InvitationsService } from './invitations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Invitation', schema: InvitationSchema },
    ]),
  ],
  controllers: [InvitationsController],
  providers: [InvitationsService],
})
export class InvitationsModule {}
