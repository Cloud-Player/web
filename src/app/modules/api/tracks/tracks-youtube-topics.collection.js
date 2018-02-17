"use strict";
var __extends = (this && this.__extends) || (function () {
  var extendStatics = Object.setPrototypeOf ||
    ({__proto__: []} instanceof Array && function (d, b) {
      d.__proto__ = b;
    }) ||
    function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
Object.defineProperty(exports, "__esModule", {value: true});
var tracks_youtube_topic_model_1 = require("./tracks-youtube-topic.model");
var base_collection_1 = require("../../backbone/collections/base.collection");
var TracksYoutubeTopicsCollection = /** @class */ (function (_super) {
  __extends(TracksYoutubeTopicsCollection, _super);

  function TracksYoutubeTopicsCollection() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.model = tracks_youtube_topic_model_1.TracksYoutubeTopicModel;
    return _this;
  }

  TracksYoutubeTopicsCollection.getInstance = function () {
    if (!this.instance) {
      this.instance = new TracksYoutubeTopicsCollection();
      this.instance.add([
        {
          id: '/m/04rlf',
          title: 'Music',
          isParent: true
        }, {
          id: '/m/02mscn',
          title: 'Christian music'
        }, {
          id: '/m/0ggq0m',
          title: 'Classical music'
        }, {
          id: '/m/01lyv',
          title: 'Country'
        }, {
          id: '/m/02lkt',
          title: 'Electronic music'
        }, {
          id: '/m/0glt670',
          title: 'Hip hop music'
        }, {
          id: '/m/05rwpb',
          title: 'Independent music'
        }, {
          id: '/m/03_d0',
          title: 'Jazz'
        }, {
          id: '/m/028sqc',
          title: 'Music of Asia'
        }, {
          id: '/m/0g293',
          title: 'Music of Latin America'
        }, {
          id: '/m/064t9',
          title: 'Pop music'
        }, {
          id: '/m/06cqb',
          title: 'Reggae'
        }, {
          id: '/m/06j6l',
          title: 'Rhythm and blues'
        }, {
          id: '/m/06by7',
          title: 'Rock music'
        }, {
          id: '/m/0gywn',
          title: 'Soul music'
        }, {
          id: '/m/0bzvm2',
          title: 'Gaming',
          isParent: true
        }, {
          id: '/m/025zzc',
          title: 'Action game'
        }, {
          id: '/m/02ntfj',
          title: 'Action-adventure game'
        }, {
          id: '/m/0b1vjn',
          title: 'Casual game'
        }, {
          id: '/m/02hygl',
          title: 'Music video game'
        }, {
          id: '/m/04q1x3q',
          title: 'Puzzle video game'
        }, {
          id: '/m/01sjng',
          title: 'Racing video game'
        }, {
          id: '/m/0403l3g',
          title: 'Role-playing video game'
        }, {
          id: '/m/021bp2',
          title: 'Simulation video game'
        }, {
          id: '/m/022dc6',
          title: 'Sports game'
        }, {
          id: '/m/03hf_rm',
          title: 'Strategy video game'
        }, {
          id: '/m/06ntj',
          title: 'Sports',
          isParent: true
        }, {
          id: '/m/0jm_',
          title: 'American football'
        }, {
          id: '/m/018jz',
          title: 'Baseball'
        }, {
          id: '/m/018w8',
          title: 'Basketball'
        }, {
          id: '/m/01cgz',
          title: 'Boxing'
        }, {
          id: '/m/09xp_',
          title: 'Cricket'
        }, {
          id: '/m/02vx4',
          title: 'Football'
        }, {
          id: '/m/037hz',
          title: 'Golf'
        }, {
          id: '/m/03tmr',
          title: 'Ice hockey'
        }, {
          id: '/m/01h7lh',
          title: 'Mixed martial arts'
        }, {
          id: '/m/0410tth',
          title: 'Motorsport'
        }, {
          id: '/m/07bs0',
          title: 'Tennis'
        }, {
          id: '/m/07_53',
          title: 'Volleyball'
        }, {
          id: '/m/02jjt',
          title: 'Entertainment',
          isParent: true
        }, {
          id: '/m/09kqc',
          title: 'Humor'
        }, {
          id: '/m/02vxn',
          title: 'Movies'
        }, {
          id: '/m/05qjc',
          title: 'Performing arts'
        }, {
          id: '/m/066wd',
          title: 'Professional wrestling'
        }, {
          id: '/m/0f2f9',
          title: 'TV shows'
        }, {
          id: '/m/019_rr',
          title: 'Lifestyle',
          isParent: true
        }, {
          id: '/m/032tl',
          title: 'Fashion'
        }, {
          id: '/m/027x7n',
          title: 'Fitness'
        }, {
          id: '/m/02wbm',
          title: 'Food'
        }, {
          id: '/m/03glg',
          title: 'Hobby'
        }, {
          id: '/m/068hy',
          title: 'Pets'
        }, {
          id: '/m/041xxh',
          title: 'Physical attractiveness [Beauty]'
        }, {
          id: '/m/07c1v',
          title: 'Technology'
        }, {
          id: '/m/07bxq',
          title: 'Tourism'
        }, {
          id: '/m/07yv9',
          title: 'Vehicles'
        }, {
          id: '/m/098wr',
          title: 'Society',
          isParent: true
        }, {
          id: '/m/09s1f',
          title: 'Business'
        }, {
          id: '/m/0kt51',
          title: 'Health'
        }, {
          id: '/m/01h6rj',
          title: 'Military'
        }, {
          id: '/m/05qt0',
          title: 'Politics'
        }, {
          id: '/m/06bvp',
          title: 'Religion'
        }, {
          id: '/m/01k8wb',
          title: 'Knowledge'
        }
      ]);
    }
    return this.instance;
  };
  return TracksYoutubeTopicsCollection;
}(base_collection_1.BaseCollection));
exports.TracksYoutubeTopicsCollection = TracksYoutubeTopicsCollection;
