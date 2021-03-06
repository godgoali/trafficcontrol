/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { ElementFinder, browser, by, element, ExpectedConditions } from 'protractor'
import { BasePage } from './BasePage.po'
import { timeout } from 'q'
export class LoginPage extends BasePage{
    private txtUserName = element(by.id("loginUsername"))
    private txtPassword = element(by.id("loginPass"))
    private btnLogin = element(by.name("loginSubmit"))
    private lnkResetPassword= element (by.xpath("//button[text()='Reset Password']"))
    private lblUserName = element(by.xpath("//span[@id='headerUsername']"))

    private config = require('../config');
    private randomize = this.config.randomize;

    async Login(userName: string, password: string ){
        if(userName == 'admin'){
            await this.txtUserName.sendKeys(userName)
            await this.txtPassword.sendKeys(password)
            await browser.actions().mouseMove(this.btnLogin).perform();
            await browser.actions().click(this.btnLogin).perform();    
        }else{
            await this.txtUserName.sendKeys(userName+this.randomize)
            await this.txtPassword.sendKeys(password)
            await browser.actions().mouseMove(this.btnLogin).perform();
            await browser.actions().click(this.btnLogin).perform();    
        }
    }
    ClickResetPassword(){
        this.lnkResetPassword.click()
    }
    async CheckUserName(userName: string) {
        if(await this.lblUserName.getText() == 'admin' || await this.lblUserName.getText() == userName+this.randomize){
            return true;
        }else{
            return false;   
        }
    }
};
