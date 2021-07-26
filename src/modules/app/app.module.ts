import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from '../role/role.module';
import { UserRoleModule } from '../user-role/user-role.module';
import { UserModule } from '../user/user.module';
import { join } from 'path';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    RoleModule,
    UserRoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { } // eslint-disable-line
