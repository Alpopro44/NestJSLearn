import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
@Injectable()
export class LocalGuard extends AuthGuard('local'){
    canActivate(context: ExecutionContext

    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log("Guard Çalıştı");
        return super.canActivate(context);
    }
}