exports.initialize = function () {
    helpers.set_tab("billing");

    const stripe_key = $("#payment-method").data("key");
    const card_change_handler = StripeCheckout.configure({ // eslint-disable-line no-undef
        key: stripe_key,
        image: '/static/images/logo/zulip-icon-128x128.png',
        locale: 'auto',
        token: function (stripe_token) {
            helpers.create_ajax_request("/json/billing/sources/change", "cardchange", stripe_token);
        },
    });

    $('#update-card-button').on('click', function (e) {
        const email = $("#payment-method").data("email");
        card_change_handler.open({
            name: 'Zulip',
            zipCode: true,
            billingAddress: true,
            panelLabel: "Update card",
            email: email,
            label: "Update card",
            allowRememberMe: false,
        });
        e.preventDefault();
    });

    $("#change-plan-status").on('click', function (e) {
        helpers.create_ajax_request("/json/billing/plan/change", "planchange", undefined, ["status"]);
        e.preventDefault();
    });
};

window.billing = exports;

$(function () {
    exports.initialize();
});
