'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">server documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AcertoFechamentosModule.html" data-type="entity-link" >AcertoFechamentosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AcertoFechamentosModule-8d41d56efc8b4ba3ab59c73b8bd70ec621e017dc4b8d1a29b989be267f3414ecd6b8333f490b85fd3804e6823ff5545765334b9914dfb174d6737f1d61ea9ffe"' : 'data-bs-target="#xs-controllers-links-module-AcertoFechamentosModule-8d41d56efc8b4ba3ab59c73b8bd70ec621e017dc4b8d1a29b989be267f3414ecd6b8333f490b85fd3804e6823ff5545765334b9914dfb174d6737f1d61ea9ffe"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AcertoFechamentosModule-8d41d56efc8b4ba3ab59c73b8bd70ec621e017dc4b8d1a29b989be267f3414ecd6b8333f490b85fd3804e6823ff5545765334b9914dfb174d6737f1d61ea9ffe"' :
                                            'id="xs-controllers-links-module-AcertoFechamentosModule-8d41d56efc8b4ba3ab59c73b8bd70ec621e017dc4b8d1a29b989be267f3414ecd6b8333f490b85fd3804e6823ff5545765334b9914dfb174d6737f1d61ea9ffe"' }>
                                            <li class="link">
                                                <a href="controllers/AcertoFechamentosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AcertoFechamentosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AcertoFechamentosModule-8d41d56efc8b4ba3ab59c73b8bd70ec621e017dc4b8d1a29b989be267f3414ecd6b8333f490b85fd3804e6823ff5545765334b9914dfb174d6737f1d61ea9ffe"' : 'data-bs-target="#xs-injectables-links-module-AcertoFechamentosModule-8d41d56efc8b4ba3ab59c73b8bd70ec621e017dc4b8d1a29b989be267f3414ecd6b8333f490b85fd3804e6823ff5545765334b9914dfb174d6737f1d61ea9ffe"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AcertoFechamentosModule-8d41d56efc8b4ba3ab59c73b8bd70ec621e017dc4b8d1a29b989be267f3414ecd6b8333f490b85fd3804e6823ff5545765334b9914dfb174d6737f1d61ea9ffe"' :
                                        'id="xs-injectables-links-module-AcertoFechamentosModule-8d41d56efc8b4ba3ab59c73b8bd70ec621e017dc4b8d1a29b989be267f3414ecd6b8333f490b85fd3804e6823ff5545765334b9914dfb174d6737f1d61ea9ffe"' }>
                                        <li class="link">
                                            <a href="injectables/AcertoFechamentosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AcertoFechamentosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AlmoxarifadosModule.html" data-type="entity-link" >AlmoxarifadosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AlmoxarifadosModule-0828f2173626a85772853a8e4c40ce0f1f60ff44f08240860847f6e9da56e8c0291ac32371bf2399ecd0dc2a762fce77bb0e3342c590a324c062ee488242e5df"' : 'data-bs-target="#xs-controllers-links-module-AlmoxarifadosModule-0828f2173626a85772853a8e4c40ce0f1f60ff44f08240860847f6e9da56e8c0291ac32371bf2399ecd0dc2a762fce77bb0e3342c590a324c062ee488242e5df"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AlmoxarifadosModule-0828f2173626a85772853a8e4c40ce0f1f60ff44f08240860847f6e9da56e8c0291ac32371bf2399ecd0dc2a762fce77bb0e3342c590a324c062ee488242e5df"' :
                                            'id="xs-controllers-links-module-AlmoxarifadosModule-0828f2173626a85772853a8e4c40ce0f1f60ff44f08240860847f6e9da56e8c0291ac32371bf2399ecd0dc2a762fce77bb0e3342c590a324c062ee488242e5df"' }>
                                            <li class="link">
                                                <a href="controllers/AlmoxarifadosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlmoxarifadosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AlmoxarifadosModule-0828f2173626a85772853a8e4c40ce0f1f60ff44f08240860847f6e9da56e8c0291ac32371bf2399ecd0dc2a762fce77bb0e3342c590a324c062ee488242e5df"' : 'data-bs-target="#xs-injectables-links-module-AlmoxarifadosModule-0828f2173626a85772853a8e4c40ce0f1f60ff44f08240860847f6e9da56e8c0291ac32371bf2399ecd0dc2a762fce77bb0e3342c590a324c062ee488242e5df"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AlmoxarifadosModule-0828f2173626a85772853a8e4c40ce0f1f60ff44f08240860847f6e9da56e8c0291ac32371bf2399ecd0dc2a762fce77bb0e3342c590a324c062ee488242e5df"' :
                                        'id="xs-injectables-links-module-AlmoxarifadosModule-0828f2173626a85772853a8e4c40ce0f1f60ff44f08240860847f6e9da56e8c0291ac32371bf2399ecd0dc2a762fce77bb0e3342c590a324c062ee488242e5df"' }>
                                        <li class="link">
                                            <a href="injectables/AlmoxarifadosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlmoxarifadosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-a476f48cf6b2b668a4f1c379ef3f4e1b6744d95b8aa283f226ee41a1bd8d64b27c7057223186d7a2a5cb91044ec35cd05916349aa9bdcb293f275aab4b81d33f"' : 'data-bs-target="#xs-injectables-links-module-AppModule-a476f48cf6b2b668a4f1c379ef3f4e1b6744d95b8aa283f226ee41a1bd8d64b27c7057223186d7a2a5cb91044ec35cd05916349aa9bdcb293f275aab4b81d33f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-a476f48cf6b2b668a4f1c379ef3f4e1b6744d95b8aa283f226ee41a1bd8d64b27c7057223186d7a2a5cb91044ec35cd05916349aa9bdcb293f275aab4b81d33f"' :
                                        'id="xs-injectables-links-module-AppModule-a476f48cf6b2b668a4f1c379ef3f4e1b6744d95b8aa283f226ee41a1bd8d64b27c7057223186d7a2a5cb91044ec35cd05916349aa9bdcb293f275aab4b81d33f"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaTenantService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaTenantService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-c350ae061a00f23d61d784d31c8e759d790e0d16c1b5a05d3eb1416ebadf56a4acd48a154a63bf7167222ebedd11dbdae4675b8f870ac85873e95fdcb2c23e4c"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-c350ae061a00f23d61d784d31c8e759d790e0d16c1b5a05d3eb1416ebadf56a4acd48a154a63bf7167222ebedd11dbdae4675b8f870ac85873e95fdcb2c23e4c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-c350ae061a00f23d61d784d31c8e759d790e0d16c1b5a05d3eb1416ebadf56a4acd48a154a63bf7167222ebedd11dbdae4675b8f870ac85873e95fdcb2c23e4c"' :
                                            'id="xs-controllers-links-module-AuthModule-c350ae061a00f23d61d784d31c8e759d790e0d16c1b5a05d3eb1416ebadf56a4acd48a154a63bf7167222ebedd11dbdae4675b8f870ac85873e95fdcb2c23e4c"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-c350ae061a00f23d61d784d31c8e759d790e0d16c1b5a05d3eb1416ebadf56a4acd48a154a63bf7167222ebedd11dbdae4675b8f870ac85873e95fdcb2c23e4c"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-c350ae061a00f23d61d784d31c8e759d790e0d16c1b5a05d3eb1416ebadf56a4acd48a154a63bf7167222ebedd11dbdae4675b8f870ac85873e95fdcb2c23e4c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-c350ae061a00f23d61d784d31c8e759d790e0d16c1b5a05d3eb1416ebadf56a4acd48a154a63bf7167222ebedd11dbdae4675b8f870ac85873e95fdcb2c23e4c"' :
                                        'id="xs-injectables-links-module-AuthModule-c350ae061a00f23d61d784d31c8e759d790e0d16c1b5a05d3eb1416ebadf56a4acd48a154a63bf7167222ebedd11dbdae4675b8f870ac85873e95fdcb2c23e4c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshTokenStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BrindesModule.html" data-type="entity-link" >BrindesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BrindesModule-3e045653e392052c8c0d59bbf8a83ddeb8297432d25dd17f7300d3f836a131a7fd9cf65c9fae3d4d20befb158cc56b87c56ed779d1a6b3c5779612fc64deca52"' : 'data-bs-target="#xs-controllers-links-module-BrindesModule-3e045653e392052c8c0d59bbf8a83ddeb8297432d25dd17f7300d3f836a131a7fd9cf65c9fae3d4d20befb158cc56b87c56ed779d1a6b3c5779612fc64deca52"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BrindesModule-3e045653e392052c8c0d59bbf8a83ddeb8297432d25dd17f7300d3f836a131a7fd9cf65c9fae3d4d20befb158cc56b87c56ed779d1a6b3c5779612fc64deca52"' :
                                            'id="xs-controllers-links-module-BrindesModule-3e045653e392052c8c0d59bbf8a83ddeb8297432d25dd17f7300d3f836a131a7fd9cf65c9fae3d4d20befb158cc56b87c56ed779d1a6b3c5779612fc64deca52"' }>
                                            <li class="link">
                                                <a href="controllers/BrindesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrindesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BrindesModule-3e045653e392052c8c0d59bbf8a83ddeb8297432d25dd17f7300d3f836a131a7fd9cf65c9fae3d4d20befb158cc56b87c56ed779d1a6b3c5779612fc64deca52"' : 'data-bs-target="#xs-injectables-links-module-BrindesModule-3e045653e392052c8c0d59bbf8a83ddeb8297432d25dd17f7300d3f836a131a7fd9cf65c9fae3d4d20befb158cc56b87c56ed779d1a6b3c5779612fc64deca52"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BrindesModule-3e045653e392052c8c0d59bbf8a83ddeb8297432d25dd17f7300d3f836a131a7fd9cf65c9fae3d4d20befb158cc56b87c56ed779d1a6b3c5779612fc64deca52"' :
                                        'id="xs-injectables-links-module-BrindesModule-3e045653e392052c8c0d59bbf8a83ddeb8297432d25dd17f7300d3f836a131a7fd9cf65c9fae3d4d20befb158cc56b87c56ed779d1a6b3c5779612fc64deca52"' }>
                                        <li class="link">
                                            <a href="injectables/BrindesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrindesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CidadesModule.html" data-type="entity-link" >CidadesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CidadesModule-165151645b6b6344b54a7232d7f5a2e1095c05514f766b48e908c25a82765d83cbdde2c8ff0742677adeba723f83a1ca39cf082f150a6a875e82fe16c130cbbc"' : 'data-bs-target="#xs-controllers-links-module-CidadesModule-165151645b6b6344b54a7232d7f5a2e1095c05514f766b48e908c25a82765d83cbdde2c8ff0742677adeba723f83a1ca39cf082f150a6a875e82fe16c130cbbc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CidadesModule-165151645b6b6344b54a7232d7f5a2e1095c05514f766b48e908c25a82765d83cbdde2c8ff0742677adeba723f83a1ca39cf082f150a6a875e82fe16c130cbbc"' :
                                            'id="xs-controllers-links-module-CidadesModule-165151645b6b6344b54a7232d7f5a2e1095c05514f766b48e908c25a82765d83cbdde2c8ff0742677adeba723f83a1ca39cf082f150a6a875e82fe16c130cbbc"' }>
                                            <li class="link">
                                                <a href="controllers/CidadesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CidadesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CidadesModule-165151645b6b6344b54a7232d7f5a2e1095c05514f766b48e908c25a82765d83cbdde2c8ff0742677adeba723f83a1ca39cf082f150a6a875e82fe16c130cbbc"' : 'data-bs-target="#xs-injectables-links-module-CidadesModule-165151645b6b6344b54a7232d7f5a2e1095c05514f766b48e908c25a82765d83cbdde2c8ff0742677adeba723f83a1ca39cf082f150a6a875e82fe16c130cbbc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CidadesModule-165151645b6b6344b54a7232d7f5a2e1095c05514f766b48e908c25a82765d83cbdde2c8ff0742677adeba723f83a1ca39cf082f150a6a875e82fe16c130cbbc"' :
                                        'id="xs-injectables-links-module-CidadesModule-165151645b6b6344b54a7232d7f5a2e1095c05514f766b48e908c25a82765d83cbdde2c8ff0742677adeba723f83a1ca39cf082f150a6a875e82fe16c130cbbc"' }>
                                        <li class="link">
                                            <a href="injectables/CidadesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CidadesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClientesModule.html" data-type="entity-link" >ClientesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ClientesModule-21bdf039e38159e091b2cdce5b144b64366ee15c971b019ada6a2be3e0c6f1f072a9f7d209ae86605ba774bb2b567e4bfef9385f305505341427e84fa12ca0fa"' : 'data-bs-target="#xs-controllers-links-module-ClientesModule-21bdf039e38159e091b2cdce5b144b64366ee15c971b019ada6a2be3e0c6f1f072a9f7d209ae86605ba774bb2b567e4bfef9385f305505341427e84fa12ca0fa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ClientesModule-21bdf039e38159e091b2cdce5b144b64366ee15c971b019ada6a2be3e0c6f1f072a9f7d209ae86605ba774bb2b567e4bfef9385f305505341427e84fa12ca0fa"' :
                                            'id="xs-controllers-links-module-ClientesModule-21bdf039e38159e091b2cdce5b144b64366ee15c971b019ada6a2be3e0c6f1f072a9f7d209ae86605ba774bb2b567e4bfef9385f305505341427e84fa12ca0fa"' }>
                                            <li class="link">
                                                <a href="controllers/ClientesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ClientesModule-21bdf039e38159e091b2cdce5b144b64366ee15c971b019ada6a2be3e0c6f1f072a9f7d209ae86605ba774bb2b567e4bfef9385f305505341427e84fa12ca0fa"' : 'data-bs-target="#xs-injectables-links-module-ClientesModule-21bdf039e38159e091b2cdce5b144b64366ee15c971b019ada6a2be3e0c6f1f072a9f7d209ae86605ba774bb2b567e4bfef9385f305505341427e84fa12ca0fa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ClientesModule-21bdf039e38159e091b2cdce5b144b64366ee15c971b019ada6a2be3e0c6f1f072a9f7d209ae86605ba774bb2b567e4bfef9385f305505341427e84fa12ca0fa"' :
                                        'id="xs-injectables-links-module-ClientesModule-21bdf039e38159e091b2cdce5b144b64366ee15c971b019ada6a2be3e0c6f1f072a9f7d209ae86605ba774bb2b567e4bfef9385f305505341427e84fa12ca0fa"' }>
                                        <li class="link">
                                            <a href="injectables/ClientesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CobrancasModule.html" data-type="entity-link" >CobrancasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CobrancasModule-a0091c9f3da57c9e1d0cd6ccac7006479bf780bcaff86b026c3b5ca9d3d235dcc551bd26732b6c129b5972fc31af163f02fd205c0c0a7cb12da12d96510be93c"' : 'data-bs-target="#xs-controllers-links-module-CobrancasModule-a0091c9f3da57c9e1d0cd6ccac7006479bf780bcaff86b026c3b5ca9d3d235dcc551bd26732b6c129b5972fc31af163f02fd205c0c0a7cb12da12d96510be93c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CobrancasModule-a0091c9f3da57c9e1d0cd6ccac7006479bf780bcaff86b026c3b5ca9d3d235dcc551bd26732b6c129b5972fc31af163f02fd205c0c0a7cb12da12d96510be93c"' :
                                            'id="xs-controllers-links-module-CobrancasModule-a0091c9f3da57c9e1d0cd6ccac7006479bf780bcaff86b026c3b5ca9d3d235dcc551bd26732b6c129b5972fc31af163f02fd205c0c0a7cb12da12d96510be93c"' }>
                                            <li class="link">
                                                <a href="controllers/CobrancasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CobrancasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CobrancasModule-a0091c9f3da57c9e1d0cd6ccac7006479bf780bcaff86b026c3b5ca9d3d235dcc551bd26732b6c129b5972fc31af163f02fd205c0c0a7cb12da12d96510be93c"' : 'data-bs-target="#xs-injectables-links-module-CobrancasModule-a0091c9f3da57c9e1d0cd6ccac7006479bf780bcaff86b026c3b5ca9d3d235dcc551bd26732b6c129b5972fc31af163f02fd205c0c0a7cb12da12d96510be93c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CobrancasModule-a0091c9f3da57c9e1d0cd6ccac7006479bf780bcaff86b026c3b5ca9d3d235dcc551bd26732b6c129b5972fc31af163f02fd205c0c0a7cb12da12d96510be93c"' :
                                        'id="xs-injectables-links-module-CobrancasModule-a0091c9f3da57c9e1d0cd6ccac7006479bf780bcaff86b026c3b5ca9d3d235dcc551bd26732b6c129b5972fc31af163f02fd205c0c0a7cb12da12d96510be93c"' }>
                                        <li class="link">
                                            <a href="injectables/CobrancasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CobrancasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComposicoesModule.html" data-type="entity-link" >ComposicoesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ComposicoesModule-8bba3c9584053a750b7610e37904e7cb1862cf34f9637252ff62c68d1efca55b2594f03bb6100c61dce9a360003a5ec22aed46f7daaf34b51d69ad1366e667f7"' : 'data-bs-target="#xs-controllers-links-module-ComposicoesModule-8bba3c9584053a750b7610e37904e7cb1862cf34f9637252ff62c68d1efca55b2594f03bb6100c61dce9a360003a5ec22aed46f7daaf34b51d69ad1366e667f7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ComposicoesModule-8bba3c9584053a750b7610e37904e7cb1862cf34f9637252ff62c68d1efca55b2594f03bb6100c61dce9a360003a5ec22aed46f7daaf34b51d69ad1366e667f7"' :
                                            'id="xs-controllers-links-module-ComposicoesModule-8bba3c9584053a750b7610e37904e7cb1862cf34f9637252ff62c68d1efca55b2594f03bb6100c61dce9a360003a5ec22aed46f7daaf34b51d69ad1366e667f7"' }>
                                            <li class="link">
                                                <a href="controllers/ComposicoesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ComposicoesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ComposicoesModule-8bba3c9584053a750b7610e37904e7cb1862cf34f9637252ff62c68d1efca55b2594f03bb6100c61dce9a360003a5ec22aed46f7daaf34b51d69ad1366e667f7"' : 'data-bs-target="#xs-injectables-links-module-ComposicoesModule-8bba3c9584053a750b7610e37904e7cb1862cf34f9637252ff62c68d1efca55b2594f03bb6100c61dce9a360003a5ec22aed46f7daaf34b51d69ad1366e667f7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ComposicoesModule-8bba3c9584053a750b7610e37904e7cb1862cf34f9637252ff62c68d1efca55b2594f03bb6100c61dce9a360003a5ec22aed46f7daaf34b51d69ad1366e667f7"' :
                                        'id="xs-injectables-links-module-ComposicoesModule-8bba3c9584053a750b7610e37904e7cb1862cf34f9637252ff62c68d1efca55b2594f03bb6100c61dce9a360003a5ec22aed46f7daaf34b51d69ad1366e667f7"' }>
                                        <li class="link">
                                            <a href="injectables/ComposicoesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ComposicoesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DebitosClientesModule.html" data-type="entity-link" >DebitosClientesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DebitosClientesModule-bcbce6100ab4a11eaaced450b5805ae64d634df27add9e35e8e5cf5e3b9fc260c5874e7a219a21f9eab2195f4e9b0785c2dcca2e1c8a1a6b319fb3dbce2d8859"' : 'data-bs-target="#xs-controllers-links-module-DebitosClientesModule-bcbce6100ab4a11eaaced450b5805ae64d634df27add9e35e8e5cf5e3b9fc260c5874e7a219a21f9eab2195f4e9b0785c2dcca2e1c8a1a6b319fb3dbce2d8859"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DebitosClientesModule-bcbce6100ab4a11eaaced450b5805ae64d634df27add9e35e8e5cf5e3b9fc260c5874e7a219a21f9eab2195f4e9b0785c2dcca2e1c8a1a6b319fb3dbce2d8859"' :
                                            'id="xs-controllers-links-module-DebitosClientesModule-bcbce6100ab4a11eaaced450b5805ae64d634df27add9e35e8e5cf5e3b9fc260c5874e7a219a21f9eab2195f4e9b0785c2dcca2e1c8a1a6b319fb3dbce2d8859"' }>
                                            <li class="link">
                                                <a href="controllers/DebitosClientesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DebitosClientesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DebitosClientesModule-bcbce6100ab4a11eaaced450b5805ae64d634df27add9e35e8e5cf5e3b9fc260c5874e7a219a21f9eab2195f4e9b0785c2dcca2e1c8a1a6b319fb3dbce2d8859"' : 'data-bs-target="#xs-injectables-links-module-DebitosClientesModule-bcbce6100ab4a11eaaced450b5805ae64d634df27add9e35e8e5cf5e3b9fc260c5874e7a219a21f9eab2195f4e9b0785c2dcca2e1c8a1a6b319fb3dbce2d8859"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DebitosClientesModule-bcbce6100ab4a11eaaced450b5805ae64d634df27add9e35e8e5cf5e3b9fc260c5874e7a219a21f9eab2195f4e9b0785c2dcca2e1c8a1a6b319fb3dbce2d8859"' :
                                        'id="xs-injectables-links-module-DebitosClientesModule-bcbce6100ab4a11eaaced450b5805ae64d634df27add9e35e8e5cf5e3b9fc260c5874e7a219a21f9eab2195f4e9b0785c2dcca2e1c8a1a6b319fb3dbce2d8859"' }>
                                        <li class="link">
                                            <a href="injectables/DebitosClientesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DebitosClientesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DepositosModule.html" data-type="entity-link" >DepositosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DepositosModule-83d5681ce92f7dae10b5c123640b8d6297ca359cfacae2a7219842153ae1364484336590c4aec093820c62d725c637c3c11853f60dbd79232648849e35ac04e4"' : 'data-bs-target="#xs-controllers-links-module-DepositosModule-83d5681ce92f7dae10b5c123640b8d6297ca359cfacae2a7219842153ae1364484336590c4aec093820c62d725c637c3c11853f60dbd79232648849e35ac04e4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DepositosModule-83d5681ce92f7dae10b5c123640b8d6297ca359cfacae2a7219842153ae1364484336590c4aec093820c62d725c637c3c11853f60dbd79232648849e35ac04e4"' :
                                            'id="xs-controllers-links-module-DepositosModule-83d5681ce92f7dae10b5c123640b8d6297ca359cfacae2a7219842153ae1364484336590c4aec093820c62d725c637c3c11853f60dbd79232648849e35ac04e4"' }>
                                            <li class="link">
                                                <a href="controllers/DepositosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DepositosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DepositosModule-83d5681ce92f7dae10b5c123640b8d6297ca359cfacae2a7219842153ae1364484336590c4aec093820c62d725c637c3c11853f60dbd79232648849e35ac04e4"' : 'data-bs-target="#xs-injectables-links-module-DepositosModule-83d5681ce92f7dae10b5c123640b8d6297ca359cfacae2a7219842153ae1364484336590c4aec093820c62d725c637c3c11853f60dbd79232648849e35ac04e4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DepositosModule-83d5681ce92f7dae10b5c123640b8d6297ca359cfacae2a7219842153ae1364484336590c4aec093820c62d725c637c3c11853f60dbd79232648849e35ac04e4"' :
                                        'id="xs-injectables-links-module-DepositosModule-83d5681ce92f7dae10b5c123640b8d6297ca359cfacae2a7219842153ae1364484336590c4aec093820c62d725c637c3c11853f60dbd79232648849e35ac04e4"' }>
                                        <li class="link">
                                            <a href="injectables/DepositosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DepositosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DespesasModule.html" data-type="entity-link" >DespesasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DespesasModule-9569e2078bfb22871cd7a8bab90be4daa1b1a4682f2dd7f09d3925c0e287b57b6a49148e87fd6f5273a2d316700df3b09e02d2128866d769cd7c66c2b98e08f2"' : 'data-bs-target="#xs-controllers-links-module-DespesasModule-9569e2078bfb22871cd7a8bab90be4daa1b1a4682f2dd7f09d3925c0e287b57b6a49148e87fd6f5273a2d316700df3b09e02d2128866d769cd7c66c2b98e08f2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DespesasModule-9569e2078bfb22871cd7a8bab90be4daa1b1a4682f2dd7f09d3925c0e287b57b6a49148e87fd6f5273a2d316700df3b09e02d2128866d769cd7c66c2b98e08f2"' :
                                            'id="xs-controllers-links-module-DespesasModule-9569e2078bfb22871cd7a8bab90be4daa1b1a4682f2dd7f09d3925c0e287b57b6a49148e87fd6f5273a2d316700df3b09e02d2128866d769cd7c66c2b98e08f2"' }>
                                            <li class="link">
                                                <a href="controllers/DespesasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DespesasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DespesasModule-9569e2078bfb22871cd7a8bab90be4daa1b1a4682f2dd7f09d3925c0e287b57b6a49148e87fd6f5273a2d316700df3b09e02d2128866d769cd7c66c2b98e08f2"' : 'data-bs-target="#xs-injectables-links-module-DespesasModule-9569e2078bfb22871cd7a8bab90be4daa1b1a4682f2dd7f09d3925c0e287b57b6a49148e87fd6f5273a2d316700df3b09e02d2128866d769cd7c66c2b98e08f2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DespesasModule-9569e2078bfb22871cd7a8bab90be4daa1b1a4682f2dd7f09d3925c0e287b57b6a49148e87fd6f5273a2d316700df3b09e02d2128866d769cd7c66c2b98e08f2"' :
                                        'id="xs-injectables-links-module-DespesasModule-9569e2078bfb22871cd7a8bab90be4daa1b1a4682f2dd7f09d3925c0e287b57b6a49148e87fd6f5273a2d316700df3b09e02d2128866d769cd7c66c2b98e08f2"' }>
                                        <li class="link">
                                            <a href="injectables/DespesasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DespesasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FuncaosModule.html" data-type="entity-link" >FuncaosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FuncaosModule-c69718cbb30e5337a42b75bd47c5b2bde1860785906b414aadc3cea5c8fe6b02d7d68f20f23e3f760817de278769216bd0ed07dd945e3dcdce17bdba9bc715ac"' : 'data-bs-target="#xs-controllers-links-module-FuncaosModule-c69718cbb30e5337a42b75bd47c5b2bde1860785906b414aadc3cea5c8fe6b02d7d68f20f23e3f760817de278769216bd0ed07dd945e3dcdce17bdba9bc715ac"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FuncaosModule-c69718cbb30e5337a42b75bd47c5b2bde1860785906b414aadc3cea5c8fe6b02d7d68f20f23e3f760817de278769216bd0ed07dd945e3dcdce17bdba9bc715ac"' :
                                            'id="xs-controllers-links-module-FuncaosModule-c69718cbb30e5337a42b75bd47c5b2bde1860785906b414aadc3cea5c8fe6b02d7d68f20f23e3f760817de278769216bd0ed07dd945e3dcdce17bdba9bc715ac"' }>
                                            <li class="link">
                                                <a href="controllers/FuncaosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FuncaosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FuncaosModule-c69718cbb30e5337a42b75bd47c5b2bde1860785906b414aadc3cea5c8fe6b02d7d68f20f23e3f760817de278769216bd0ed07dd945e3dcdce17bdba9bc715ac"' : 'data-bs-target="#xs-injectables-links-module-FuncaosModule-c69718cbb30e5337a42b75bd47c5b2bde1860785906b414aadc3cea5c8fe6b02d7d68f20f23e3f760817de278769216bd0ed07dd945e3dcdce17bdba9bc715ac"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FuncaosModule-c69718cbb30e5337a42b75bd47c5b2bde1860785906b414aadc3cea5c8fe6b02d7d68f20f23e3f760817de278769216bd0ed07dd945e3dcdce17bdba9bc715ac"' :
                                        'id="xs-injectables-links-module-FuncaosModule-c69718cbb30e5337a42b75bd47c5b2bde1860785906b414aadc3cea5c8fe6b02d7d68f20f23e3f760817de278769216bd0ed07dd945e3dcdce17bdba9bc715ac"' }>
                                        <li class="link">
                                            <a href="injectables/FuncaosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FuncaosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FuncionarioPerfilsModule.html" data-type="entity-link" >FuncionarioPerfilsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FuncionarioPerfilsModule-38ea28f40608999cd722c07b0a424c33b4cb2e74f75172731b0380e752e0ecc2310f3a14529973d4e1c0405d220226b357af3fb9a832aa2371ab3e09f371daca"' : 'data-bs-target="#xs-controllers-links-module-FuncionarioPerfilsModule-38ea28f40608999cd722c07b0a424c33b4cb2e74f75172731b0380e752e0ecc2310f3a14529973d4e1c0405d220226b357af3fb9a832aa2371ab3e09f371daca"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FuncionarioPerfilsModule-38ea28f40608999cd722c07b0a424c33b4cb2e74f75172731b0380e752e0ecc2310f3a14529973d4e1c0405d220226b357af3fb9a832aa2371ab3e09f371daca"' :
                                            'id="xs-controllers-links-module-FuncionarioPerfilsModule-38ea28f40608999cd722c07b0a424c33b4cb2e74f75172731b0380e752e0ecc2310f3a14529973d4e1c0405d220226b357af3fb9a832aa2371ab3e09f371daca"' }>
                                            <li class="link">
                                                <a href="controllers/FuncionarioPerfilsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FuncionarioPerfilsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FuncionarioPerfilsModule-38ea28f40608999cd722c07b0a424c33b4cb2e74f75172731b0380e752e0ecc2310f3a14529973d4e1c0405d220226b357af3fb9a832aa2371ab3e09f371daca"' : 'data-bs-target="#xs-injectables-links-module-FuncionarioPerfilsModule-38ea28f40608999cd722c07b0a424c33b4cb2e74f75172731b0380e752e0ecc2310f3a14529973d4e1c0405d220226b357af3fb9a832aa2371ab3e09f371daca"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FuncionarioPerfilsModule-38ea28f40608999cd722c07b0a424c33b4cb2e74f75172731b0380e752e0ecc2310f3a14529973d4e1c0405d220226b357af3fb9a832aa2371ab3e09f371daca"' :
                                        'id="xs-injectables-links-module-FuncionarioPerfilsModule-38ea28f40608999cd722c07b0a424c33b4cb2e74f75172731b0380e752e0ecc2310f3a14529973d4e1c0405d220226b357af3fb9a832aa2371ab3e09f371daca"' }>
                                        <li class="link">
                                            <a href="injectables/FuncionarioPerfilsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FuncionarioPerfilsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FuncionariosModule.html" data-type="entity-link" >FuncionariosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FuncionariosModule-5edef12f852ddac0360b5f2cf4fd44be76969d5ab14cf344600fd234be38149d3c312db8ada0847f80be53efc68fb9000c77ffe2986776fa1405e80838ec892b"' : 'data-bs-target="#xs-controllers-links-module-FuncionariosModule-5edef12f852ddac0360b5f2cf4fd44be76969d5ab14cf344600fd234be38149d3c312db8ada0847f80be53efc68fb9000c77ffe2986776fa1405e80838ec892b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FuncionariosModule-5edef12f852ddac0360b5f2cf4fd44be76969d5ab14cf344600fd234be38149d3c312db8ada0847f80be53efc68fb9000c77ffe2986776fa1405e80838ec892b"' :
                                            'id="xs-controllers-links-module-FuncionariosModule-5edef12f852ddac0360b5f2cf4fd44be76969d5ab14cf344600fd234be38149d3c312db8ada0847f80be53efc68fb9000c77ffe2986776fa1405e80838ec892b"' }>
                                            <li class="link">
                                                <a href="controllers/FuncionariosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FuncionariosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FuncionariosModule-5edef12f852ddac0360b5f2cf4fd44be76969d5ab14cf344600fd234be38149d3c312db8ada0847f80be53efc68fb9000c77ffe2986776fa1405e80838ec892b"' : 'data-bs-target="#xs-injectables-links-module-FuncionariosModule-5edef12f852ddac0360b5f2cf4fd44be76969d5ab14cf344600fd234be38149d3c312db8ada0847f80be53efc68fb9000c77ffe2986776fa1405e80838ec892b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FuncionariosModule-5edef12f852ddac0360b5f2cf4fd44be76969d5ab14cf344600fd234be38149d3c312db8ada0847f80be53efc68fb9000c77ffe2986776fa1405e80838ec892b"' :
                                        'id="xs-injectables-links-module-FuncionariosModule-5edef12f852ddac0360b5f2cf4fd44be76969d5ab14cf344600fd234be38149d3c312db8ada0847f80be53efc68fb9000c77ffe2986776fa1405e80838ec892b"' }>
                                        <li class="link">
                                            <a href="injectables/FuncionariosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FuncionariosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HistoricoComposicoesModule.html" data-type="entity-link" >HistoricoComposicoesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HistoricoComposicoesModule-a102a106cc5c55f3bc1888156f112278038fe78939870db57d1cf63314d146d189aacf406da1447c9a5e9287280afdadfaec7889b2eb1bd73bce84c564fb1c2a"' : 'data-bs-target="#xs-controllers-links-module-HistoricoComposicoesModule-a102a106cc5c55f3bc1888156f112278038fe78939870db57d1cf63314d146d189aacf406da1447c9a5e9287280afdadfaec7889b2eb1bd73bce84c564fb1c2a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HistoricoComposicoesModule-a102a106cc5c55f3bc1888156f112278038fe78939870db57d1cf63314d146d189aacf406da1447c9a5e9287280afdadfaec7889b2eb1bd73bce84c564fb1c2a"' :
                                            'id="xs-controllers-links-module-HistoricoComposicoesModule-a102a106cc5c55f3bc1888156f112278038fe78939870db57d1cf63314d146d189aacf406da1447c9a5e9287280afdadfaec7889b2eb1bd73bce84c564fb1c2a"' }>
                                            <li class="link">
                                                <a href="controllers/HistoricoComposicoesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HistoricoComposicoesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-HistoricoComposicoesModule-a102a106cc5c55f3bc1888156f112278038fe78939870db57d1cf63314d146d189aacf406da1447c9a5e9287280afdadfaec7889b2eb1bd73bce84c564fb1c2a"' : 'data-bs-target="#xs-injectables-links-module-HistoricoComposicoesModule-a102a106cc5c55f3bc1888156f112278038fe78939870db57d1cf63314d146d189aacf406da1447c9a5e9287280afdadfaec7889b2eb1bd73bce84c564fb1c2a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HistoricoComposicoesModule-a102a106cc5c55f3bc1888156f112278038fe78939870db57d1cf63314d146d189aacf406da1447c9a5e9287280afdadfaec7889b2eb1bd73bce84c564fb1c2a"' :
                                        'id="xs-injectables-links-module-HistoricoComposicoesModule-a102a106cc5c55f3bc1888156f112278038fe78939870db57d1cf63314d146d189aacf406da1447c9a5e9287280afdadfaec7889b2eb1bd73bce84c564fb1c2a"' }>
                                        <li class="link">
                                            <a href="injectables/HistoricoComposicoesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HistoricoComposicoesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HistoricoPontosModule.html" data-type="entity-link" >HistoricoPontosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HistoricoPontosModule-a46e4e78b466e7756f42767205c54aff723293adf4f4d44df9624f106ae10b79c871be731e4219b8c05aae1b827b1b3056812a53e7ad7140793518415cb2ead7"' : 'data-bs-target="#xs-controllers-links-module-HistoricoPontosModule-a46e4e78b466e7756f42767205c54aff723293adf4f4d44df9624f106ae10b79c871be731e4219b8c05aae1b827b1b3056812a53e7ad7140793518415cb2ead7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HistoricoPontosModule-a46e4e78b466e7756f42767205c54aff723293adf4f4d44df9624f106ae10b79c871be731e4219b8c05aae1b827b1b3056812a53e7ad7140793518415cb2ead7"' :
                                            'id="xs-controllers-links-module-HistoricoPontosModule-a46e4e78b466e7756f42767205c54aff723293adf4f4d44df9624f106ae10b79c871be731e4219b8c05aae1b827b1b3056812a53e7ad7140793518415cb2ead7"' }>
                                            <li class="link">
                                                <a href="controllers/HistoricoPontosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HistoricoPontosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-HistoricoPontosModule-a46e4e78b466e7756f42767205c54aff723293adf4f4d44df9624f106ae10b79c871be731e4219b8c05aae1b827b1b3056812a53e7ad7140793518415cb2ead7"' : 'data-bs-target="#xs-injectables-links-module-HistoricoPontosModule-a46e4e78b466e7756f42767205c54aff723293adf4f4d44df9624f106ae10b79c871be731e4219b8c05aae1b827b1b3056812a53e7ad7140793518415cb2ead7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HistoricoPontosModule-a46e4e78b466e7756f42767205c54aff723293adf4f4d44df9624f106ae10b79c871be731e4219b8c05aae1b827b1b3056812a53e7ad7140793518415cb2ead7"' :
                                        'id="xs-injectables-links-module-HistoricoPontosModule-a46e4e78b466e7756f42767205c54aff723293adf4f4d44df9624f106ae10b79c871be731e4219b8c05aae1b827b1b3056812a53e7ad7140793518415cb2ead7"' }>
                                        <li class="link">
                                            <a href="injectables/HistoricoPontosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HistoricoPontosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ItensAcertosModule.html" data-type="entity-link" >ItensAcertosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ItensAcertosModule-a80c4e58943554a12f26f179ec5a39c54143cf08f8540a2b555b73888581589dc010869481e59cae5ce3888b948e853f8b2f735de959453ad68cedc2a1eba703"' : 'data-bs-target="#xs-controllers-links-module-ItensAcertosModule-a80c4e58943554a12f26f179ec5a39c54143cf08f8540a2b555b73888581589dc010869481e59cae5ce3888b948e853f8b2f735de959453ad68cedc2a1eba703"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ItensAcertosModule-a80c4e58943554a12f26f179ec5a39c54143cf08f8540a2b555b73888581589dc010869481e59cae5ce3888b948e853f8b2f735de959453ad68cedc2a1eba703"' :
                                            'id="xs-controllers-links-module-ItensAcertosModule-a80c4e58943554a12f26f179ec5a39c54143cf08f8540a2b555b73888581589dc010869481e59cae5ce3888b948e853f8b2f735de959453ad68cedc2a1eba703"' }>
                                            <li class="link">
                                                <a href="controllers/ItensAcertosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItensAcertosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ItensAcertosModule-a80c4e58943554a12f26f179ec5a39c54143cf08f8540a2b555b73888581589dc010869481e59cae5ce3888b948e853f8b2f735de959453ad68cedc2a1eba703"' : 'data-bs-target="#xs-injectables-links-module-ItensAcertosModule-a80c4e58943554a12f26f179ec5a39c54143cf08f8540a2b555b73888581589dc010869481e59cae5ce3888b948e853f8b2f735de959453ad68cedc2a1eba703"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ItensAcertosModule-a80c4e58943554a12f26f179ec5a39c54143cf08f8540a2b555b73888581589dc010869481e59cae5ce3888b948e853f8b2f735de959453ad68cedc2a1eba703"' :
                                        'id="xs-injectables-links-module-ItensAcertosModule-a80c4e58943554a12f26f179ec5a39c54143cf08f8540a2b555b73888581589dc010869481e59cae5ce3888b948e853f8b2f735de959453ad68cedc2a1eba703"' }>
                                        <li class="link">
                                            <a href="injectables/ItensAcertosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItensAcertosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ItensPedidoAlmoxarifadosModule.html" data-type="entity-link" >ItensPedidoAlmoxarifadosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ItensPedidoAlmoxarifadosModule-192361615c783e835103638213372bfa8154d4c58f949597b0869a72e60d8e269c3ef62f88e9b1028e9b40c4a28704bef9f128d2142798917f41b5e7aac509b2"' : 'data-bs-target="#xs-controllers-links-module-ItensPedidoAlmoxarifadosModule-192361615c783e835103638213372bfa8154d4c58f949597b0869a72e60d8e269c3ef62f88e9b1028e9b40c4a28704bef9f128d2142798917f41b5e7aac509b2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ItensPedidoAlmoxarifadosModule-192361615c783e835103638213372bfa8154d4c58f949597b0869a72e60d8e269c3ef62f88e9b1028e9b40c4a28704bef9f128d2142798917f41b5e7aac509b2"' :
                                            'id="xs-controllers-links-module-ItensPedidoAlmoxarifadosModule-192361615c783e835103638213372bfa8154d4c58f949597b0869a72e60d8e269c3ef62f88e9b1028e9b40c4a28704bef9f128d2142798917f41b5e7aac509b2"' }>
                                            <li class="link">
                                                <a href="controllers/ItensPedidoAlmoxarifadosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItensPedidoAlmoxarifadosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ItensPedidoAlmoxarifadosModule-192361615c783e835103638213372bfa8154d4c58f949597b0869a72e60d8e269c3ef62f88e9b1028e9b40c4a28704bef9f128d2142798917f41b5e7aac509b2"' : 'data-bs-target="#xs-injectables-links-module-ItensPedidoAlmoxarifadosModule-192361615c783e835103638213372bfa8154d4c58f949597b0869a72e60d8e269c3ef62f88e9b1028e9b40c4a28704bef9f128d2142798917f41b5e7aac509b2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ItensPedidoAlmoxarifadosModule-192361615c783e835103638213372bfa8154d4c58f949597b0869a72e60d8e269c3ef62f88e9b1028e9b40c4a28704bef9f128d2142798917f41b5e7aac509b2"' :
                                        'id="xs-injectables-links-module-ItensPedidoAlmoxarifadosModule-192361615c783e835103638213372bfa8154d4c58f949597b0869a72e60d8e269c3ef62f88e9b1028e9b40c4a28704bef9f128d2142798917f41b5e7aac509b2"' }>
                                        <li class="link">
                                            <a href="injectables/ItensPedidoAlmoxarifadosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItensPedidoAlmoxarifadosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LinhasModule.html" data-type="entity-link" >LinhasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LinhasModule-ce431ac9386b12f0b0402b8d2a8f836ed7b87a6f1078a9aa8d22a09ad75820314db724305a14dde5cada33d23d1bce8d721d06b03516fd4c47e9c248caec0438"' : 'data-bs-target="#xs-controllers-links-module-LinhasModule-ce431ac9386b12f0b0402b8d2a8f836ed7b87a6f1078a9aa8d22a09ad75820314db724305a14dde5cada33d23d1bce8d721d06b03516fd4c47e9c248caec0438"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LinhasModule-ce431ac9386b12f0b0402b8d2a8f836ed7b87a6f1078a9aa8d22a09ad75820314db724305a14dde5cada33d23d1bce8d721d06b03516fd4c47e9c248caec0438"' :
                                            'id="xs-controllers-links-module-LinhasModule-ce431ac9386b12f0b0402b8d2a8f836ed7b87a6f1078a9aa8d22a09ad75820314db724305a14dde5cada33d23d1bce8d721d06b03516fd4c47e9c248caec0438"' }>
                                            <li class="link">
                                                <a href="controllers/LinhasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LinhasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LinhasModule-ce431ac9386b12f0b0402b8d2a8f836ed7b87a6f1078a9aa8d22a09ad75820314db724305a14dde5cada33d23d1bce8d721d06b03516fd4c47e9c248caec0438"' : 'data-bs-target="#xs-injectables-links-module-LinhasModule-ce431ac9386b12f0b0402b8d2a8f836ed7b87a6f1078a9aa8d22a09ad75820314db724305a14dde5cada33d23d1bce8d721d06b03516fd4c47e9c248caec0438"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LinhasModule-ce431ac9386b12f0b0402b8d2a8f836ed7b87a6f1078a9aa8d22a09ad75820314db724305a14dde5cada33d23d1bce8d721d06b03516fd4c47e9c248caec0438"' :
                                        'id="xs-injectables-links-module-LinhasModule-ce431ac9386b12f0b0402b8d2a8f836ed7b87a6f1078a9aa8d22a09ad75820314db724305a14dde5cada33d23d1bce8d721d06b03516fd4c47e9c248caec0438"' }>
                                        <li class="link">
                                            <a href="injectables/LinhasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LinhasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LogMesasModule.html" data-type="entity-link" >LogMesasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LogMesasModule-ae569ef89e0868bc1c0db9b4edb8b4301bb3e995d85f075be22a1bca2734b9991158fe2d2305b545142af0075b6d354b06cfcb4b4698bb70c8a89b026427afcb"' : 'data-bs-target="#xs-controllers-links-module-LogMesasModule-ae569ef89e0868bc1c0db9b4edb8b4301bb3e995d85f075be22a1bca2734b9991158fe2d2305b545142af0075b6d354b06cfcb4b4698bb70c8a89b026427afcb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LogMesasModule-ae569ef89e0868bc1c0db9b4edb8b4301bb3e995d85f075be22a1bca2734b9991158fe2d2305b545142af0075b6d354b06cfcb4b4698bb70c8a89b026427afcb"' :
                                            'id="xs-controllers-links-module-LogMesasModule-ae569ef89e0868bc1c0db9b4edb8b4301bb3e995d85f075be22a1bca2734b9991158fe2d2305b545142af0075b6d354b06cfcb4b4698bb70c8a89b026427afcb"' }>
                                            <li class="link">
                                                <a href="controllers/LogMesasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogMesasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LogMesasModule-ae569ef89e0868bc1c0db9b4edb8b4301bb3e995d85f075be22a1bca2734b9991158fe2d2305b545142af0075b6d354b06cfcb4b4698bb70c8a89b026427afcb"' : 'data-bs-target="#xs-injectables-links-module-LogMesasModule-ae569ef89e0868bc1c0db9b4edb8b4301bb3e995d85f075be22a1bca2734b9991158fe2d2305b545142af0075b6d354b06cfcb4b4698bb70c8a89b026427afcb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LogMesasModule-ae569ef89e0868bc1c0db9b4edb8b4301bb3e995d85f075be22a1bca2734b9991158fe2d2305b545142af0075b6d354b06cfcb4b4698bb70c8a89b026427afcb"' :
                                        'id="xs-injectables-links-module-LogMesasModule-ae569ef89e0868bc1c0db9b4edb8b4301bb3e995d85f075be22a1bca2734b9991158fe2d2305b545142af0075b6d354b06cfcb4b4698bb70c8a89b026427afcb"' }>
                                        <li class="link">
                                            <a href="injectables/LogMesasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogMesasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MembrosLinhasModule.html" data-type="entity-link" >MembrosLinhasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MembrosLinhasModule-906ff26fa4a856a11a78ac99520991d60c69a52e22de7492b01efa5f3256a8642df459a49f9477279356d60b7ba1f0b275be7480dc506ba3eee1e7cdfd72e3bc"' : 'data-bs-target="#xs-controllers-links-module-MembrosLinhasModule-906ff26fa4a856a11a78ac99520991d60c69a52e22de7492b01efa5f3256a8642df459a49f9477279356d60b7ba1f0b275be7480dc506ba3eee1e7cdfd72e3bc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MembrosLinhasModule-906ff26fa4a856a11a78ac99520991d60c69a52e22de7492b01efa5f3256a8642df459a49f9477279356d60b7ba1f0b275be7480dc506ba3eee1e7cdfd72e3bc"' :
                                            'id="xs-controllers-links-module-MembrosLinhasModule-906ff26fa4a856a11a78ac99520991d60c69a52e22de7492b01efa5f3256a8642df459a49f9477279356d60b7ba1f0b275be7480dc506ba3eee1e7cdfd72e3bc"' }>
                                            <li class="link">
                                                <a href="controllers/MembrosLinhasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MembrosLinhasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MembrosLinhasModule-906ff26fa4a856a11a78ac99520991d60c69a52e22de7492b01efa5f3256a8642df459a49f9477279356d60b7ba1f0b275be7480dc506ba3eee1e7cdfd72e3bc"' : 'data-bs-target="#xs-injectables-links-module-MembrosLinhasModule-906ff26fa4a856a11a78ac99520991d60c69a52e22de7492b01efa5f3256a8642df459a49f9477279356d60b7ba1f0b275be7480dc506ba3eee1e7cdfd72e3bc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MembrosLinhasModule-906ff26fa4a856a11a78ac99520991d60c69a52e22de7492b01efa5f3256a8642df459a49f9477279356d60b7ba1f0b275be7480dc506ba3eee1e7cdfd72e3bc"' :
                                        'id="xs-injectables-links-module-MembrosLinhasModule-906ff26fa4a856a11a78ac99520991d60c69a52e22de7492b01efa5f3256a8642df459a49f9477279356d60b7ba1f0b275be7480dc506ba3eee1e7cdfd72e3bc"' }>
                                        <li class="link">
                                            <a href="injectables/MembrosLinhasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MembrosLinhasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MesaEntradasModule.html" data-type="entity-link" >MesaEntradasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MesaEntradasModule-97610ede2425bb8a087063732608259314bccf67ee336e4b545d5ed3655a140e5cc5e7e6c3f01dbc26b3bbf9eede6083d1de621498f28406dde211b1a3b5746f"' : 'data-bs-target="#xs-controllers-links-module-MesaEntradasModule-97610ede2425bb8a087063732608259314bccf67ee336e4b545d5ed3655a140e5cc5e7e6c3f01dbc26b3bbf9eede6083d1de621498f28406dde211b1a3b5746f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MesaEntradasModule-97610ede2425bb8a087063732608259314bccf67ee336e4b545d5ed3655a140e5cc5e7e6c3f01dbc26b3bbf9eede6083d1de621498f28406dde211b1a3b5746f"' :
                                            'id="xs-controllers-links-module-MesaEntradasModule-97610ede2425bb8a087063732608259314bccf67ee336e4b545d5ed3655a140e5cc5e7e6c3f01dbc26b3bbf9eede6083d1de621498f28406dde211b1a3b5746f"' }>
                                            <li class="link">
                                                <a href="controllers/MesaEntradasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MesaEntradasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MesaEntradasModule-97610ede2425bb8a087063732608259314bccf67ee336e4b545d5ed3655a140e5cc5e7e6c3f01dbc26b3bbf9eede6083d1de621498f28406dde211b1a3b5746f"' : 'data-bs-target="#xs-injectables-links-module-MesaEntradasModule-97610ede2425bb8a087063732608259314bccf67ee336e4b545d5ed3655a140e5cc5e7e6c3f01dbc26b3bbf9eede6083d1de621498f28406dde211b1a3b5746f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MesaEntradasModule-97610ede2425bb8a087063732608259314bccf67ee336e4b545d5ed3655a140e5cc5e7e6c3f01dbc26b3bbf9eede6083d1de621498f28406dde211b1a3b5746f"' :
                                        'id="xs-injectables-links-module-MesaEntradasModule-97610ede2425bb8a087063732608259314bccf67ee336e4b545d5ed3655a140e5cc5e7e6c3f01dbc26b3bbf9eede6083d1de621498f28406dde211b1a3b5746f"' }>
                                        <li class="link">
                                            <a href="injectables/MesaEntradasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MesaEntradasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MesaSaidasModule.html" data-type="entity-link" >MesaSaidasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MesaSaidasModule-0880469a7fc7e9588e447cdca5aa1a5abe451357f2754c97b974491a61d74f81ee6db721ece9754609647cefada7ad426e4c54b7ef5179ee4ef4ddee20f6a7f2"' : 'data-bs-target="#xs-controllers-links-module-MesaSaidasModule-0880469a7fc7e9588e447cdca5aa1a5abe451357f2754c97b974491a61d74f81ee6db721ece9754609647cefada7ad426e4c54b7ef5179ee4ef4ddee20f6a7f2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MesaSaidasModule-0880469a7fc7e9588e447cdca5aa1a5abe451357f2754c97b974491a61d74f81ee6db721ece9754609647cefada7ad426e4c54b7ef5179ee4ef4ddee20f6a7f2"' :
                                            'id="xs-controllers-links-module-MesaSaidasModule-0880469a7fc7e9588e447cdca5aa1a5abe451357f2754c97b974491a61d74f81ee6db721ece9754609647cefada7ad426e4c54b7ef5179ee4ef4ddee20f6a7f2"' }>
                                            <li class="link">
                                                <a href="controllers/MesaSaidasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MesaSaidasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MesaSaidasModule-0880469a7fc7e9588e447cdca5aa1a5abe451357f2754c97b974491a61d74f81ee6db721ece9754609647cefada7ad426e4c54b7ef5179ee4ef4ddee20f6a7f2"' : 'data-bs-target="#xs-injectables-links-module-MesaSaidasModule-0880469a7fc7e9588e447cdca5aa1a5abe451357f2754c97b974491a61d74f81ee6db721ece9754609647cefada7ad426e4c54b7ef5179ee4ef4ddee20f6a7f2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MesaSaidasModule-0880469a7fc7e9588e447cdca5aa1a5abe451357f2754c97b974491a61d74f81ee6db721ece9754609647cefada7ad426e4c54b7ef5179ee4ef4ddee20f6a7f2"' :
                                        'id="xs-injectables-links-module-MesaSaidasModule-0880469a7fc7e9588e447cdca5aa1a5abe451357f2754c97b974491a61d74f81ee6db721ece9754609647cefada7ad426e4c54b7ef5179ee4ef4ddee20f6a7f2"' }>
                                        <li class="link">
                                            <a href="injectables/MesaSaidasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MesaSaidasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MesasModule.html" data-type="entity-link" >MesasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MesasModule-cf6075707171314cb763d9337988b59ec93c8346553a38b79496dc59c17b1282115c95eef9558fca7fbca2f25ed8815bf30a746403c2ebf77e2a0e20c0d7c627"' : 'data-bs-target="#xs-controllers-links-module-MesasModule-cf6075707171314cb763d9337988b59ec93c8346553a38b79496dc59c17b1282115c95eef9558fca7fbca2f25ed8815bf30a746403c2ebf77e2a0e20c0d7c627"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MesasModule-cf6075707171314cb763d9337988b59ec93c8346553a38b79496dc59c17b1282115c95eef9558fca7fbca2f25ed8815bf30a746403c2ebf77e2a0e20c0d7c627"' :
                                            'id="xs-controllers-links-module-MesasModule-cf6075707171314cb763d9337988b59ec93c8346553a38b79496dc59c17b1282115c95eef9558fca7fbca2f25ed8815bf30a746403c2ebf77e2a0e20c0d7c627"' }>
                                            <li class="link">
                                                <a href="controllers/MesasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MesasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MesasModule-cf6075707171314cb763d9337988b59ec93c8346553a38b79496dc59c17b1282115c95eef9558fca7fbca2f25ed8815bf30a746403c2ebf77e2a0e20c0d7c627"' : 'data-bs-target="#xs-injectables-links-module-MesasModule-cf6075707171314cb763d9337988b59ec93c8346553a38b79496dc59c17b1282115c95eef9558fca7fbca2f25ed8815bf30a746403c2ebf77e2a0e20c0d7c627"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MesasModule-cf6075707171314cb763d9337988b59ec93c8346553a38b79496dc59c17b1282115c95eef9558fca7fbca2f25ed8815bf30a746403c2ebf77e2a0e20c0d7c627"' :
                                        'id="xs-injectables-links-module-MesasModule-cf6075707171314cb763d9337988b59ec93c8346553a38b79496dc59c17b1282115c95eef9558fca7fbca2f25ed8815bf30a746403c2ebf77e2a0e20c0d7c627"' }>
                                        <li class="link">
                                            <a href="injectables/MesasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MesasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovimentacoesModule.html" data-type="entity-link" >MovimentacoesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MovimentacoesModule-8483e01b1a9331dc006d8b12ae11016b60478bfa222d0138e2bef119d74a543467527820a36a31278e3cf49732f6f6d3e5acf0c3920a9975857a327a93e63831"' : 'data-bs-target="#xs-controllers-links-module-MovimentacoesModule-8483e01b1a9331dc006d8b12ae11016b60478bfa222d0138e2bef119d74a543467527820a36a31278e3cf49732f6f6d3e5acf0c3920a9975857a327a93e63831"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MovimentacoesModule-8483e01b1a9331dc006d8b12ae11016b60478bfa222d0138e2bef119d74a543467527820a36a31278e3cf49732f6f6d3e5acf0c3920a9975857a327a93e63831"' :
                                            'id="xs-controllers-links-module-MovimentacoesModule-8483e01b1a9331dc006d8b12ae11016b60478bfa222d0138e2bef119d74a543467527820a36a31278e3cf49732f6f6d3e5acf0c3920a9975857a327a93e63831"' }>
                                            <li class="link">
                                                <a href="controllers/MovimentacoesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MovimentacoesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MovimentacoesModule-8483e01b1a9331dc006d8b12ae11016b60478bfa222d0138e2bef119d74a543467527820a36a31278e3cf49732f6f6d3e5acf0c3920a9975857a327a93e63831"' : 'data-bs-target="#xs-injectables-links-module-MovimentacoesModule-8483e01b1a9331dc006d8b12ae11016b60478bfa222d0138e2bef119d74a543467527820a36a31278e3cf49732f6f6d3e5acf0c3920a9975857a327a93e63831"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MovimentacoesModule-8483e01b1a9331dc006d8b12ae11016b60478bfa222d0138e2bef119d74a543467527820a36a31278e3cf49732f6f6d3e5acf0c3920a9975857a327a93e63831"' :
                                        'id="xs-injectables-links-module-MovimentacoesModule-8483e01b1a9331dc006d8b12ae11016b60478bfa222d0138e2bef119d74a543467527820a36a31278e3cf49732f6f6d3e5acf0c3920a9975857a327a93e63831"' }>
                                        <li class="link">
                                            <a href="injectables/MovimentacoesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MovimentacoesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PedidoAlmoxarifadosModule.html" data-type="entity-link" >PedidoAlmoxarifadosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PedidoAlmoxarifadosModule-ee5bc8cf6ccea3ffc1a4e63af0d8f08de1190ede474baabbf21f81a6108175b55960029654077b2a4caaea9ad63a5caa867377cfdb2247041e0932a125661f7d"' : 'data-bs-target="#xs-controllers-links-module-PedidoAlmoxarifadosModule-ee5bc8cf6ccea3ffc1a4e63af0d8f08de1190ede474baabbf21f81a6108175b55960029654077b2a4caaea9ad63a5caa867377cfdb2247041e0932a125661f7d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PedidoAlmoxarifadosModule-ee5bc8cf6ccea3ffc1a4e63af0d8f08de1190ede474baabbf21f81a6108175b55960029654077b2a4caaea9ad63a5caa867377cfdb2247041e0932a125661f7d"' :
                                            'id="xs-controllers-links-module-PedidoAlmoxarifadosModule-ee5bc8cf6ccea3ffc1a4e63af0d8f08de1190ede474baabbf21f81a6108175b55960029654077b2a4caaea9ad63a5caa867377cfdb2247041e0932a125661f7d"' }>
                                            <li class="link">
                                                <a href="controllers/PedidoAlmoxarifadosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PedidoAlmoxarifadosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PedidoAlmoxarifadosModule-ee5bc8cf6ccea3ffc1a4e63af0d8f08de1190ede474baabbf21f81a6108175b55960029654077b2a4caaea9ad63a5caa867377cfdb2247041e0932a125661f7d"' : 'data-bs-target="#xs-injectables-links-module-PedidoAlmoxarifadosModule-ee5bc8cf6ccea3ffc1a4e63af0d8f08de1190ede474baabbf21f81a6108175b55960029654077b2a4caaea9ad63a5caa867377cfdb2247041e0932a125661f7d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PedidoAlmoxarifadosModule-ee5bc8cf6ccea3ffc1a4e63af0d8f08de1190ede474baabbf21f81a6108175b55960029654077b2a4caaea9ad63a5caa867377cfdb2247041e0932a125661f7d"' :
                                        'id="xs-injectables-links-module-PedidoAlmoxarifadosModule-ee5bc8cf6ccea3ffc1a4e63af0d8f08de1190ede474baabbf21f81a6108175b55960029654077b2a4caaea9ad63a5caa867377cfdb2247041e0932a125661f7d"' }>
                                        <li class="link">
                                            <a href="injectables/PedidoAlmoxarifadosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PedidoAlmoxarifadosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PerfilsModule.html" data-type="entity-link" >PerfilsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PerfilsModule-510ed7b85ae432b74a7475016d93e0d32e9893ce7de23e57f78199f728533a7c3a486c48a4dc48f4a4be583c41fd4e5bf1f450e19505993ad3714938a877b7fd"' : 'data-bs-target="#xs-controllers-links-module-PerfilsModule-510ed7b85ae432b74a7475016d93e0d32e9893ce7de23e57f78199f728533a7c3a486c48a4dc48f4a4be583c41fd4e5bf1f450e19505993ad3714938a877b7fd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PerfilsModule-510ed7b85ae432b74a7475016d93e0d32e9893ce7de23e57f78199f728533a7c3a486c48a4dc48f4a4be583c41fd4e5bf1f450e19505993ad3714938a877b7fd"' :
                                            'id="xs-controllers-links-module-PerfilsModule-510ed7b85ae432b74a7475016d93e0d32e9893ce7de23e57f78199f728533a7c3a486c48a4dc48f4a4be583c41fd4e5bf1f450e19505993ad3714938a877b7fd"' }>
                                            <li class="link">
                                                <a href="controllers/PerfilsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PerfilsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PerfilsModule-510ed7b85ae432b74a7475016d93e0d32e9893ce7de23e57f78199f728533a7c3a486c48a4dc48f4a4be583c41fd4e5bf1f450e19505993ad3714938a877b7fd"' : 'data-bs-target="#xs-injectables-links-module-PerfilsModule-510ed7b85ae432b74a7475016d93e0d32e9893ce7de23e57f78199f728533a7c3a486c48a4dc48f4a4be583c41fd4e5bf1f450e19505993ad3714938a877b7fd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PerfilsModule-510ed7b85ae432b74a7475016d93e0d32e9893ce7de23e57f78199f728533a7c3a486c48a4dc48f4a4be583c41fd4e5bf1f450e19505993ad3714938a877b7fd"' :
                                        'id="xs-injectables-links-module-PerfilsModule-510ed7b85ae432b74a7475016d93e0d32e9893ce7de23e57f78199f728533a7c3a486c48a4dc48f4a4be583c41fd4e5bf1f450e19505993ad3714938a877b7fd"' }>
                                        <li class="link">
                                            <a href="injectables/PerfilsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PerfilsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissaoUsuariosModule.html" data-type="entity-link" >PermissaoUsuariosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PermissaoUsuariosModule-208599b4a7c14aedaef34cda87b715b8f5be463f18408318b120c3053ce6e34d0b120c68755db67b8847b28aa35c1318961082b8b6df30e46ad1d003de0fd9bf"' : 'data-bs-target="#xs-controllers-links-module-PermissaoUsuariosModule-208599b4a7c14aedaef34cda87b715b8f5be463f18408318b120c3053ce6e34d0b120c68755db67b8847b28aa35c1318961082b8b6df30e46ad1d003de0fd9bf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissaoUsuariosModule-208599b4a7c14aedaef34cda87b715b8f5be463f18408318b120c3053ce6e34d0b120c68755db67b8847b28aa35c1318961082b8b6df30e46ad1d003de0fd9bf"' :
                                            'id="xs-controllers-links-module-PermissaoUsuariosModule-208599b4a7c14aedaef34cda87b715b8f5be463f18408318b120c3053ce6e34d0b120c68755db67b8847b28aa35c1318961082b8b6df30e46ad1d003de0fd9bf"' }>
                                            <li class="link">
                                                <a href="controllers/PermissaoUsuariosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissaoUsuariosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PermissaoUsuariosModule-208599b4a7c14aedaef34cda87b715b8f5be463f18408318b120c3053ce6e34d0b120c68755db67b8847b28aa35c1318961082b8b6df30e46ad1d003de0fd9bf"' : 'data-bs-target="#xs-injectables-links-module-PermissaoUsuariosModule-208599b4a7c14aedaef34cda87b715b8f5be463f18408318b120c3053ce6e34d0b120c68755db67b8847b28aa35c1318961082b8b6df30e46ad1d003de0fd9bf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissaoUsuariosModule-208599b4a7c14aedaef34cda87b715b8f5be463f18408318b120c3053ce6e34d0b120c68755db67b8847b28aa35c1318961082b8b6df30e46ad1d003de0fd9bf"' :
                                        'id="xs-injectables-links-module-PermissaoUsuariosModule-208599b4a7c14aedaef34cda87b715b8f5be463f18408318b120c3053ce6e34d0b120c68755db67b8847b28aa35c1318961082b8b6df30e46ad1d003de0fd9bf"' }>
                                        <li class="link">
                                            <a href="injectables/PermissaoUsuariosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissaoUsuariosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PontoClientesModule.html" data-type="entity-link" >PontoClientesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PontoClientesModule-be73d67a9214dcde592bc44eb5de50ca593601abb890954c9d6fdd670d945755c5578fbe527c628b96145d91966901d83f94304fe37f371e43dd1232f2cee0b4"' : 'data-bs-target="#xs-controllers-links-module-PontoClientesModule-be73d67a9214dcde592bc44eb5de50ca593601abb890954c9d6fdd670d945755c5578fbe527c628b96145d91966901d83f94304fe37f371e43dd1232f2cee0b4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PontoClientesModule-be73d67a9214dcde592bc44eb5de50ca593601abb890954c9d6fdd670d945755c5578fbe527c628b96145d91966901d83f94304fe37f371e43dd1232f2cee0b4"' :
                                            'id="xs-controllers-links-module-PontoClientesModule-be73d67a9214dcde592bc44eb5de50ca593601abb890954c9d6fdd670d945755c5578fbe527c628b96145d91966901d83f94304fe37f371e43dd1232f2cee0b4"' }>
                                            <li class="link">
                                                <a href="controllers/PontoClientesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PontoClientesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PontoClientesModule-be73d67a9214dcde592bc44eb5de50ca593601abb890954c9d6fdd670d945755c5578fbe527c628b96145d91966901d83f94304fe37f371e43dd1232f2cee0b4"' : 'data-bs-target="#xs-injectables-links-module-PontoClientesModule-be73d67a9214dcde592bc44eb5de50ca593601abb890954c9d6fdd670d945755c5578fbe527c628b96145d91966901d83f94304fe37f371e43dd1232f2cee0b4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PontoClientesModule-be73d67a9214dcde592bc44eb5de50ca593601abb890954c9d6fdd670d945755c5578fbe527c628b96145d91966901d83f94304fe37f371e43dd1232f2cee0b4"' :
                                        'id="xs-injectables-links-module-PontoClientesModule-be73d67a9214dcde592bc44eb5de50ca593601abb890954c9d6fdd670d945755c5578fbe527c628b96145d91966901d83f94304fe37f371e43dd1232f2cee0b4"' }>
                                        <li class="link">
                                            <a href="injectables/PontoClientesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PontoClientesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PontosModule.html" data-type="entity-link" >PontosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PontosModule-0528921813853ec61f5680c3be6681835ad7255116c5e1d02697715f12ef181bff38f3d97af5cb55a0f947cf3976004fd601592c259d1796625cd7cd22080832"' : 'data-bs-target="#xs-controllers-links-module-PontosModule-0528921813853ec61f5680c3be6681835ad7255116c5e1d02697715f12ef181bff38f3d97af5cb55a0f947cf3976004fd601592c259d1796625cd7cd22080832"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PontosModule-0528921813853ec61f5680c3be6681835ad7255116c5e1d02697715f12ef181bff38f3d97af5cb55a0f947cf3976004fd601592c259d1796625cd7cd22080832"' :
                                            'id="xs-controllers-links-module-PontosModule-0528921813853ec61f5680c3be6681835ad7255116c5e1d02697715f12ef181bff38f3d97af5cb55a0f947cf3976004fd601592c259d1796625cd7cd22080832"' }>
                                            <li class="link">
                                                <a href="controllers/PontosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PontosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PontosModule-0528921813853ec61f5680c3be6681835ad7255116c5e1d02697715f12ef181bff38f3d97af5cb55a0f947cf3976004fd601592c259d1796625cd7cd22080832"' : 'data-bs-target="#xs-injectables-links-module-PontosModule-0528921813853ec61f5680c3be6681835ad7255116c5e1d02697715f12ef181bff38f3d97af5cb55a0f947cf3976004fd601592c259d1796625cd7cd22080832"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PontosModule-0528921813853ec61f5680c3be6681835ad7255116c5e1d02697715f12ef181bff38f3d97af5cb55a0f947cf3976004fd601592c259d1796625cd7cd22080832"' :
                                        'id="xs-injectables-links-module-PontosModule-0528921813853ec61f5680c3be6681835ad7255116c5e1d02697715f12ef181bff38f3d97af5cb55a0f947cf3976004fd601592c259d1796625cd7cd22080832"' }>
                                        <li class="link">
                                            <a href="injectables/PontosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PontosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-36c53f74bb6d8f0a451f53d23ed4388d54fba43d7d39e25a326d1e2aa0000dc19ecfddd62a9f6446b540ba92e86e1d48c0cd4c3e436b6f77146a89d6df37ec3a"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-36c53f74bb6d8f0a451f53d23ed4388d54fba43d7d39e25a326d1e2aa0000dc19ecfddd62a9f6446b540ba92e86e1d48c0cd4c3e436b6f77146a89d6df37ec3a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-36c53f74bb6d8f0a451f53d23ed4388d54fba43d7d39e25a326d1e2aa0000dc19ecfddd62a9f6446b540ba92e86e1d48c0cd4c3e436b6f77146a89d6df37ec3a"' :
                                        'id="xs-injectables-links-module-PrismaModule-36c53f74bb6d8f0a451f53d23ed4388d54fba43d7d39e25a326d1e2aa0000dc19ecfddd62a9f6446b540ba92e86e1d48c0cd4c3e436b6f77146a89d6df37ec3a"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaTenantModule.html" data-type="entity-link" >PrismaTenantModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaTenantModule-68a4723e34dea07aeca2a28625b6bec704740354d69c2f497f70de5af1c1617b3882c8ae869c3e6152eb0203fc83248e1019b6ecc8e13907867d2a3b4efad1c3"' : 'data-bs-target="#xs-injectables-links-module-PrismaTenantModule-68a4723e34dea07aeca2a28625b6bec704740354d69c2f497f70de5af1c1617b3882c8ae869c3e6152eb0203fc83248e1019b6ecc8e13907867d2a3b4efad1c3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaTenantModule-68a4723e34dea07aeca2a28625b6bec704740354d69c2f497f70de5af1c1617b3882c8ae869c3e6152eb0203fc83248e1019b6ecc8e13907867d2a3b4efad1c3"' :
                                        'id="xs-injectables-links-module-PrismaTenantModule-68a4723e34dea07aeca2a28625b6bec704740354d69c2f497f70de5af1c1617b3882c8ae869c3e6152eb0203fc83248e1019b6ecc8e13907867d2a3b4efad1c3"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaTenantService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaTenantService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SistemasModule.html" data-type="entity-link" >SistemasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SistemasModule-7ecd3112bd7ab795ee2915b1dc0a3b4f797241dfd5b11d09dae25eb6ccf50e84d8ac88cd71d3d95e7424e474bf70a2ca17d3929287971595ad0aea0434cedeef"' : 'data-bs-target="#xs-controllers-links-module-SistemasModule-7ecd3112bd7ab795ee2915b1dc0a3b4f797241dfd5b11d09dae25eb6ccf50e84d8ac88cd71d3d95e7424e474bf70a2ca17d3929287971595ad0aea0434cedeef"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SistemasModule-7ecd3112bd7ab795ee2915b1dc0a3b4f797241dfd5b11d09dae25eb6ccf50e84d8ac88cd71d3d95e7424e474bf70a2ca17d3929287971595ad0aea0434cedeef"' :
                                            'id="xs-controllers-links-module-SistemasModule-7ecd3112bd7ab795ee2915b1dc0a3b4f797241dfd5b11d09dae25eb6ccf50e84d8ac88cd71d3d95e7424e474bf70a2ca17d3929287971595ad0aea0434cedeef"' }>
                                            <li class="link">
                                                <a href="controllers/SistemasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SistemasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SistemasModule-7ecd3112bd7ab795ee2915b1dc0a3b4f797241dfd5b11d09dae25eb6ccf50e84d8ac88cd71d3d95e7424e474bf70a2ca17d3929287971595ad0aea0434cedeef"' : 'data-bs-target="#xs-injectables-links-module-SistemasModule-7ecd3112bd7ab795ee2915b1dc0a3b4f797241dfd5b11d09dae25eb6ccf50e84d8ac88cd71d3d95e7424e474bf70a2ca17d3929287971595ad0aea0434cedeef"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SistemasModule-7ecd3112bd7ab795ee2915b1dc0a3b4f797241dfd5b11d09dae25eb6ccf50e84d8ac88cd71d3d95e7424e474bf70a2ca17d3929287971595ad0aea0434cedeef"' :
                                        'id="xs-injectables-links-module-SistemasModule-7ecd3112bd7ab795ee2915b1dc0a3b4f797241dfd5b11d09dae25eb6ccf50e84d8ac88cd71d3d95e7424e474bf70a2ca17d3929287971595ad0aea0434cedeef"' }>
                                        <li class="link">
                                            <a href="injectables/SistemasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SistemasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TenantModule.html" data-type="entity-link" >TenantModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TenantModule-66ec2a169cc7064f7cb990f93360721609dc8ced8563b257c73f18c37fe634b15996781f956dc1c3e233761d4459a397e283ab5c40370f3d100b0939c0cbedef"' : 'data-bs-target="#xs-controllers-links-module-TenantModule-66ec2a169cc7064f7cb990f93360721609dc8ced8563b257c73f18c37fe634b15996781f956dc1c3e233761d4459a397e283ab5c40370f3d100b0939c0cbedef"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TenantModule-66ec2a169cc7064f7cb990f93360721609dc8ced8563b257c73f18c37fe634b15996781f956dc1c3e233761d4459a397e283ab5c40370f3d100b0939c0cbedef"' :
                                            'id="xs-controllers-links-module-TenantModule-66ec2a169cc7064f7cb990f93360721609dc8ced8563b257c73f18c37fe634b15996781f956dc1c3e233761d4459a397e283ab5c40370f3d100b0939c0cbedef"' }>
                                            <li class="link">
                                                <a href="controllers/TenantController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TenantController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TenantModule-66ec2a169cc7064f7cb990f93360721609dc8ced8563b257c73f18c37fe634b15996781f956dc1c3e233761d4459a397e283ab5c40370f3d100b0939c0cbedef"' : 'data-bs-target="#xs-injectables-links-module-TenantModule-66ec2a169cc7064f7cb990f93360721609dc8ced8563b257c73f18c37fe634b15996781f956dc1c3e233761d4459a397e283ab5c40370f3d100b0939c0cbedef"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TenantModule-66ec2a169cc7064f7cb990f93360721609dc8ced8563b257c73f18c37fe634b15996781f956dc1c3e233761d4459a397e283ab5c40370f3d100b0939c0cbedef"' :
                                        'id="xs-injectables-links-module-TenantModule-66ec2a169cc7064f7cb990f93360721609dc8ced8563b257c73f18c37fe634b15996781f956dc1c3e233761d4459a397e283ab5c40370f3d100b0939c0cbedef"' }>
                                        <li class="link">
                                            <a href="injectables/TenantService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TenantService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TipoDespesasModule.html" data-type="entity-link" >TipoDespesasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TipoDespesasModule-ebc86765b77a24033f7998e71543455d07a99df3221d7b4fb787eeb3977b63ff2494f08c0e301c771f0964ebeb2cc661fb88a2c2b7e3ee4e4913aefe61d2430c"' : 'data-bs-target="#xs-controllers-links-module-TipoDespesasModule-ebc86765b77a24033f7998e71543455d07a99df3221d7b4fb787eeb3977b63ff2494f08c0e301c771f0964ebeb2cc661fb88a2c2b7e3ee4e4913aefe61d2430c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TipoDespesasModule-ebc86765b77a24033f7998e71543455d07a99df3221d7b4fb787eeb3977b63ff2494f08c0e301c771f0964ebeb2cc661fb88a2c2b7e3ee4e4913aefe61d2430c"' :
                                            'id="xs-controllers-links-module-TipoDespesasModule-ebc86765b77a24033f7998e71543455d07a99df3221d7b4fb787eeb3977b63ff2494f08c0e301c771f0964ebeb2cc661fb88a2c2b7e3ee4e4913aefe61d2430c"' }>
                                            <li class="link">
                                                <a href="controllers/TipoDespesasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TipoDespesasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TipoDespesasModule-ebc86765b77a24033f7998e71543455d07a99df3221d7b4fb787eeb3977b63ff2494f08c0e301c771f0964ebeb2cc661fb88a2c2b7e3ee4e4913aefe61d2430c"' : 'data-bs-target="#xs-injectables-links-module-TipoDespesasModule-ebc86765b77a24033f7998e71543455d07a99df3221d7b4fb787eeb3977b63ff2494f08c0e301c771f0964ebeb2cc661fb88a2c2b7e3ee4e4913aefe61d2430c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TipoDespesasModule-ebc86765b77a24033f7998e71543455d07a99df3221d7b4fb787eeb3977b63ff2494f08c0e301c771f0964ebeb2cc661fb88a2c2b7e3ee4e4913aefe61d2430c"' :
                                        'id="xs-injectables-links-module-TipoDespesasModule-ebc86765b77a24033f7998e71543455d07a99df3221d7b4fb787eeb3977b63ff2494f08c0e301c771f0964ebeb2cc661fb88a2c2b7e3ee4e4913aefe61d2430c"' }>
                                        <li class="link">
                                            <a href="injectables/TipoDespesasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TipoDespesasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TipoMesasModule.html" data-type="entity-link" >TipoMesasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TipoMesasModule-222d3881fd322f389dfaf14f351c4f21f3c7f31b3e658b53cb2fc7cec5f0e173985ae5519375e42d561be3ad00a38dfcc194839b5ee90d1bf28d00ee95f42ec0"' : 'data-bs-target="#xs-controllers-links-module-TipoMesasModule-222d3881fd322f389dfaf14f351c4f21f3c7f31b3e658b53cb2fc7cec5f0e173985ae5519375e42d561be3ad00a38dfcc194839b5ee90d1bf28d00ee95f42ec0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TipoMesasModule-222d3881fd322f389dfaf14f351c4f21f3c7f31b3e658b53cb2fc7cec5f0e173985ae5519375e42d561be3ad00a38dfcc194839b5ee90d1bf28d00ee95f42ec0"' :
                                            'id="xs-controllers-links-module-TipoMesasModule-222d3881fd322f389dfaf14f351c4f21f3c7f31b3e658b53cb2fc7cec5f0e173985ae5519375e42d561be3ad00a38dfcc194839b5ee90d1bf28d00ee95f42ec0"' }>
                                            <li class="link">
                                                <a href="controllers/TipoMesasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TipoMesasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TipoMesasModule-222d3881fd322f389dfaf14f351c4f21f3c7f31b3e658b53cb2fc7cec5f0e173985ae5519375e42d561be3ad00a38dfcc194839b5ee90d1bf28d00ee95f42ec0"' : 'data-bs-target="#xs-injectables-links-module-TipoMesasModule-222d3881fd322f389dfaf14f351c4f21f3c7f31b3e658b53cb2fc7cec5f0e173985ae5519375e42d561be3ad00a38dfcc194839b5ee90d1bf28d00ee95f42ec0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TipoMesasModule-222d3881fd322f389dfaf14f351c4f21f3c7f31b3e658b53cb2fc7cec5f0e173985ae5519375e42d561be3ad00a38dfcc194839b5ee90d1bf28d00ee95f42ec0"' :
                                        'id="xs-injectables-links-module-TipoMesasModule-222d3881fd322f389dfaf14f351c4f21f3c7f31b3e658b53cb2fc7cec5f0e173985ae5519375e42d561be3ad00a38dfcc194839b5ee90d1bf28d00ee95f42ec0"' }>
                                        <li class="link">
                                            <a href="injectables/TipoMesasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TipoMesasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AcertoFechamentosController.html" data-type="entity-link" >AcertoFechamentosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AlmoxarifadosController.html" data-type="entity-link" >AlmoxarifadosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BrindesController.html" data-type="entity-link" >BrindesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CidadesController.html" data-type="entity-link" >CidadesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ClientesController.html" data-type="entity-link" >ClientesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CobrancasController.html" data-type="entity-link" >CobrancasController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ComposicoesController.html" data-type="entity-link" >ComposicoesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DebitosClientesController.html" data-type="entity-link" >DebitosClientesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DepositosController.html" data-type="entity-link" >DepositosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DespesasController.html" data-type="entity-link" >DespesasController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FuncaosController.html" data-type="entity-link" >FuncaosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FuncionarioPerfilsController.html" data-type="entity-link" >FuncionarioPerfilsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FuncionariosController.html" data-type="entity-link" >FuncionariosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HistoricoComposicoesController.html" data-type="entity-link" >HistoricoComposicoesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HistoricoPontosController.html" data-type="entity-link" >HistoricoPontosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ItensAcertosController.html" data-type="entity-link" >ItensAcertosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ItensPedidoAlmoxarifadosController.html" data-type="entity-link" >ItensPedidoAlmoxarifadosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LinhasController.html" data-type="entity-link" >LinhasController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LogMesasController.html" data-type="entity-link" >LogMesasController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MembrosLinhasController.html" data-type="entity-link" >MembrosLinhasController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MesaEntradasController.html" data-type="entity-link" >MesaEntradasController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MesaSaidasController.html" data-type="entity-link" >MesaSaidasController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MesasController.html" data-type="entity-link" >MesasController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MovimentacoesController.html" data-type="entity-link" >MovimentacoesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PedidoAlmoxarifadosController.html" data-type="entity-link" >PedidoAlmoxarifadosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PerfilsController.html" data-type="entity-link" >PerfilsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PermissaoUsuariosController.html" data-type="entity-link" >PermissaoUsuariosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PontoClientesController.html" data-type="entity-link" >PontoClientesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PontosController.html" data-type="entity-link" >PontosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SistemasController.html" data-type="entity-link" >SistemasController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TenantController.html" data-type="entity-link" >TenantController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TipoDespesasController.html" data-type="entity-link" >TipoDespesasController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TipoMesasController.html" data-type="entity-link" >TipoMesasController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AcertoFechamentoEntity.html" data-type="entity-link" >AcertoFechamentoEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlmoxarifadoEntity.html" data-type="entity-link" >AlmoxarifadoEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthEntity.html" data-type="entity-link" >AuthEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/BrindeEntity.html" data-type="entity-link" >BrindeEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CidadeEntity.html" data-type="entity-link" >CidadeEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClienteEntity.html" data-type="entity-link" >ClienteEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CobrancaEntitity.html" data-type="entity-link" >CobrancaEntitity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ComposicoeEntity.html" data-type="entity-link" >ComposicoeEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAcertoFechamentoDto.html" data-type="entity-link" >CreateAcertoFechamentoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAlmoxarifadoDto.html" data-type="entity-link" >CreateAlmoxarifadoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBrindeDto.html" data-type="entity-link" >CreateBrindeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCidadeDto.html" data-type="entity-link" >CreateCidadeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateClienteDto.html" data-type="entity-link" >CreateClienteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCobrancaDto.html" data-type="entity-link" >CreateCobrancaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateComposicoeDto.html" data-type="entity-link" >CreateComposicoeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDebitosClienteDto.html" data-type="entity-link" >CreateDebitosClienteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDepositoDto.html" data-type="entity-link" >CreateDepositoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDespesaDto.html" data-type="entity-link" >CreateDespesaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFuncaoDto.html" data-type="entity-link" >CreateFuncaoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFuncionarioDto.html" data-type="entity-link" >CreateFuncionarioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFuncionarioPerfilDto.html" data-type="entity-link" >CreateFuncionarioPerfilDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateHistoricoComposicoeDto.html" data-type="entity-link" >CreateHistoricoComposicoeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateHistoricoPontoDto.html" data-type="entity-link" >CreateHistoricoPontoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateItensAcertoDto.html" data-type="entity-link" >CreateItensAcertoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateItensPedidoAlmoxarifadoDto.html" data-type="entity-link" >CreateItensPedidoAlmoxarifadoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLinhaDto.html" data-type="entity-link" >CreateLinhaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLogMesaDto.html" data-type="entity-link" >CreateLogMesaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMembrosLinhaDto.html" data-type="entity-link" >CreateMembrosLinhaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMesaDto.html" data-type="entity-link" >CreateMesaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMesaEntradaDto.html" data-type="entity-link" >CreateMesaEntradaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMesaSaidaDto.html" data-type="entity-link" >CreateMesaSaidaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMovimentacoeDto.html" data-type="entity-link" >CreateMovimentacoeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePedidoAlmoxarifadoDto.html" data-type="entity-link" >CreatePedidoAlmoxarifadoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePerfilDto.html" data-type="entity-link" >CreatePerfilDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissaoUsuarioDto.html" data-type="entity-link" >CreatePermissaoUsuarioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePontoClienteDto.html" data-type="entity-link" >CreatePontoClienteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePontoDto.html" data-type="entity-link" >CreatePontoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSistemaDto.html" data-type="entity-link" >CreateSistemaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTenantDto.html" data-type="entity-link" >CreateTenantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTipoDespesaDto.html" data-type="entity-link" >CreateTipoDespesaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTipoMesaDto.html" data-type="entity-link" >CreateTipoMesaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DebitosClienteEntity.html" data-type="entity-link" >DebitosClienteEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/DepositoEntity.html" data-type="entity-link" >DepositoEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/DespesaEntity.html" data-type="entity-link" >DespesaEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/FuncaoEntity.html" data-type="entity-link" >FuncaoEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/FuncionarioEntity.html" data-type="entity-link" >FuncionarioEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/FuncionarioPerfilEntity.html" data-type="entity-link" >FuncionarioPerfilEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/HistoricoComposicoeEntity.html" data-type="entity-link" >HistoricoComposicoeEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/HistoricoPontoEntity.html" data-type="entity-link" >HistoricoPontoEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ItensAcertoEntity.html" data-type="entity-link" >ItensAcertoEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ItensPedidoAlmoxarifadoEntity.html" data-type="entity-link" >ItensPedidoAlmoxarifadoEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/LinhaEntity.html" data-type="entity-link" >LinhaEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogMesaEntity.html" data-type="entity-link" >LogMesaEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/MembrosLinhaEntity.html" data-type="entity-link" >MembrosLinhaEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/MesaEntity.html" data-type="entity-link" >MesaEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/MesaEntradaEntity.html" data-type="entity-link" >MesaEntradaEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/MesaSaidaEntity.html" data-type="entity-link" >MesaSaidaEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/MovimentacoeEntity.html" data-type="entity-link" >MovimentacoeEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/PedidoAlmoxarifadoEntity.html" data-type="entity-link" >PedidoAlmoxarifadoEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/PerfilEntity.html" data-type="entity-link" >PerfilEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/PermissaoUsuarioEntity.html" data-type="entity-link" >PermissaoUsuarioEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/PontoClienteEntity.html" data-type="entity-link" >PontoClienteEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/PontoEntity.html" data-type="entity-link" >PontoEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/PrismaClientExceptionFilter.html" data-type="entity-link" >PrismaClientExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/SistemaEntity.html" data-type="entity-link" >SistemaEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/TenantEntity.html" data-type="entity-link" >TenantEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/TipoDespesaEntity.html" data-type="entity-link" >TipoDespesaEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/TipoMesaEntity.html" data-type="entity-link" >TipoMesaEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAcertoFechamentoDto.html" data-type="entity-link" >UpdateAcertoFechamentoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAlmoxarifadoDto.html" data-type="entity-link" >UpdateAlmoxarifadoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBrindeDto.html" data-type="entity-link" >UpdateBrindeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCidadeDto.html" data-type="entity-link" >UpdateCidadeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateClienteDto.html" data-type="entity-link" >UpdateClienteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCobrancaDto.html" data-type="entity-link" >UpdateCobrancaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateComposicoeDto.html" data-type="entity-link" >UpdateComposicoeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDebitosClienteDto.html" data-type="entity-link" >UpdateDebitosClienteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDepositoDto.html" data-type="entity-link" >UpdateDepositoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDespesaDto.html" data-type="entity-link" >UpdateDespesaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFuncaoDto.html" data-type="entity-link" >UpdateFuncaoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFuncionarioDto.html" data-type="entity-link" >UpdateFuncionarioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFuncionarioPerfilDto.html" data-type="entity-link" >UpdateFuncionarioPerfilDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateHistoricoComposicoeDto.html" data-type="entity-link" >UpdateHistoricoComposicoeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateHistoricoPontoDto.html" data-type="entity-link" >UpdateHistoricoPontoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateItensAcertoDto.html" data-type="entity-link" >UpdateItensAcertoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateItensPedidoAlmoxarifadoDto.html" data-type="entity-link" >UpdateItensPedidoAlmoxarifadoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLinhaDto.html" data-type="entity-link" >UpdateLinhaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLogMesaDto.html" data-type="entity-link" >UpdateLogMesaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMembrosLinhaDto.html" data-type="entity-link" >UpdateMembrosLinhaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMesaDto.html" data-type="entity-link" >UpdateMesaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMesaEntradaDto.html" data-type="entity-link" >UpdateMesaEntradaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMesaSaidaDto.html" data-type="entity-link" >UpdateMesaSaidaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMovimentacoeDto.html" data-type="entity-link" >UpdateMovimentacoeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePedidoAlmoxarifadoDto.html" data-type="entity-link" >UpdatePedidoAlmoxarifadoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePerfilDto.html" data-type="entity-link" >UpdatePerfilDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissaoUsuarioDto.html" data-type="entity-link" >UpdatePermissaoUsuarioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePontoClienteDto.html" data-type="entity-link" >UpdatePontoClienteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePontoDto.html" data-type="entity-link" >UpdatePontoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSistemaDto.html" data-type="entity-link" >UpdateSistemaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTenantDto.html" data-type="entity-link" >UpdateTenantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTipoDespesaDto.html" data-type="entity-link" >UpdateTipoDespesaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTipoMesaDto.html" data-type="entity-link" >UpdateTipoMesaDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AcertoFechamentosService.html" data-type="entity-link" >AcertoFechamentosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AlmoxarifadosService.html" data-type="entity-link" >AlmoxarifadosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BrindesService.html" data-type="entity-link" >BrindesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CidadesService.html" data-type="entity-link" >CidadesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClientesService.html" data-type="entity-link" >ClientesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CobrancasService.html" data-type="entity-link" >CobrancasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ComposicoesService.html" data-type="entity-link" >ComposicoesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DebitosClientesService.html" data-type="entity-link" >DebitosClientesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DepositosService.html" data-type="entity-link" >DepositosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DespesasService.html" data-type="entity-link" >DespesasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FuncaosService.html" data-type="entity-link" >FuncaosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FuncionarioPerfilsService.html" data-type="entity-link" >FuncionarioPerfilsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FuncionariosService.html" data-type="entity-link" >FuncionariosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HistoricoComposicoesService.html" data-type="entity-link" >HistoricoComposicoesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HistoricoPontosService.html" data-type="entity-link" >HistoricoPontosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItensAcertosService.html" data-type="entity-link" >ItensAcertosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItensPedidoAlmoxarifadosService.html" data-type="entity-link" >ItensPedidoAlmoxarifadosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LinhasService.html" data-type="entity-link" >LinhasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogMesasService.html" data-type="entity-link" >LogMesasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MembrosLinhasService.html" data-type="entity-link" >MembrosLinhasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MesaEntradasService.html" data-type="entity-link" >MesaEntradasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MesaSaidasService.html" data-type="entity-link" >MesaSaidasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MesasService.html" data-type="entity-link" >MesasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MovimentacoesService.html" data-type="entity-link" >MovimentacoesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaginationInterceptor.html" data-type="entity-link" >PaginationInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PedidoAlmoxarifadosService.html" data-type="entity-link" >PedidoAlmoxarifadosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PerfilsService.html" data-type="entity-link" >PerfilsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissaoUsuariosService.html" data-type="entity-link" >PermissaoUsuariosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PontoClientesService.html" data-type="entity-link" >PontoClientesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PontosService.html" data-type="entity-link" >PontosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaTenantService.html" data-type="entity-link" >PrismaTenantService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokenGuard.html" data-type="entity-link" >RefreshTokenGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokenStrategy.html" data-type="entity-link" >RefreshTokenStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SistemasService.html" data-type="entity-link" >SistemasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TenantMiddleware.html" data-type="entity-link" >TenantMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TenantService.html" data-type="entity-link" >TenantService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TipoDespesasService.html" data-type="entity-link" >TipoDespesasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TipoMesasService.html" data-type="entity-link" >TipoMesasService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/TenantGuard.html" data-type="entity-link" >TenantGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ExtendedRequest.html" data-type="entity-link" >ExtendedRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtendedRequest-1.html" data-type="entity-link" >ExtendedRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginationParams.html" data-type="entity-link" >PaginationParams</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});